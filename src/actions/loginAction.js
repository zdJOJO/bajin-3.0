/**
 * Created by Administrator on 2017/01/12 0012.
 */
import cookie from 'react-cookie'
import { hashHistory } from 'react-router';

import {
    BEGIN_FETCH,
    FALL_FETCH,
    SUCCESS_LOGIN,
    SUCCESS_IMG_UPLOAD,
    SHOW_ERROR,
    SHOW_SUCCESS,
    CHANGE_TAP,
    COUNT_DOWN,
    SET_INTERESTING_LIST
} from '../actions/actionTypes'

import {port} from '.././public/'

//提示tips的存在时间
const timeStay = 5000;

export const changeTab = (tab)=>{
    return {
        type: CHANGE_TAP,
        tab
    }
}

//显示tips
export const showToptips = (tipStr,isShow,showType)=>{
    if(showType===2){
        let errorStr = tipStr;
        let isError = isShow;
        return {
            type: SHOW_ERROR,
            errorStr,
            isError
        }
    }else {
        let successStr = tipStr;
        let isSuccessful = isShow;
        return {
            type: SHOW_SUCCESS,
            successStr,
            isSuccessful
        }
    }

}

//倒计时
export const countDown = (countDownNum ,disable)=>{
    return {
        type: COUNT_DOWN,
        countDownNum,
        disable
    }
}

//开始发起请求
export const beginFetch = ()=>{
    return {
        type: BEGIN_FETCH
    }
}

//获取失败
export const fallFetch = (errorStr,isError)=> {
    return {
        type: FALL_FETCH,
        errorStr,
        isError
    }
}

//提交账户登录信息
export const loginSuccess = (userInfo)=> {
    return {
        type: SUCCESS_LOGIN,
        userInfo 
    }
}

//头像提交成功
export const imgUpSuccess = (headPic)=> {
    return {
        type: SUCCESS_IMG_UPLOAD,
        headPic
    }
}

//设置兴趣列表
export const setInteresting = (list)=> {
    for (var interest of list) {
        interest.isChoose = false;
    }
    return {
        type: SET_INTERESTING_LIST,
        list
    }
}

//修改兴趣item的 选中状态
export const changeChooseSate =(valueObj)=>{
    console.log('修改兴趣item的 选中状态');
    const list = valueObj.list;
    for(let i=0;i<list.length;i++){
        if(list[i].id === valueObj.id){
            list[i].isChoose = valueObj.isChoose ;
            break
        }
    }
    return {
        type: SET_INTERESTING_LIST,
        list
    }
}


/*
 *  toptips 显示
 *  showType:  1-success  2-error
 * */
const showToptipSetTimeOut = (str,showType)=>{
    return dispatch =>{
        setTimeout(()=>{
            return dispatch(showToptips('',false,showType))
        },timeStay)
        return dispatch(showToptips(str,true,showType))
    }
}

/*
* 正则判断 (手机号码，密码)
* */ 
const phoneRe = /^[1][35847][0-9]{9}$/ ;


//post 登录  注册
const fetchInfo = (valueObj,type,_subType)=> {
    let url = type===1 ? port+'/card/login?isWx=true' : port+'/card/user?captcha='+valueObj.captcha;
    let data = type===1 ? {
        phone: valueObj.phone ,
        password: valueObj.password
    } : {
        userName: 'bjzx'+parseInt(new Date().getTime()/1000 ,10),
        password: valueObj.password,
        phone: valueObj.phone,
        userRole: 0,
        headPic: "",
        gender: 0,
        signature: "",
        openId: "",
        clientId: "",
        inviteCode: valueObj.inviteCode || ''
    }
    return dispatch =>{
        console.log('注册请求的body是:')
        console.log(data)
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res =>{
            console.log(res.status);
            return res.json()
        }).then( json => {
            console.log('结果是:');
            console.log(json)
            if(type===1 && json.code==='100'){
                cookie.save('token', json.message);
                dispatch(loginSuccess(json.data));

                //直接登录和注册登录 区别
                if(!_subType &&　valueObj.isNeedBack==='1'){
                    history.back(-1);
                }else {
                    hashHistory.push({pathname: '/'});
                }
            }else if(type===2 && json.code==='201'){
                dispatch(showToptipSetTimeOut("注册成功，请填写信息" ,1));
                dispatch(fetchInfo({
                    phone: valueObj.phone ,
                    password: valueObj.password
                } ,1 ,2));  //注册成功之后进行登陆,主要是获取token
                dispatch(changeTab('setInfo'))
            }else {
                dispatch(showToptipSetTimeOut(json.message,2))
            }
        }).catch( e =>{
            dispatch(fallFetch('网络请求失败，请重新请求' ,true));
            console.log(e.message)
        });
    }
}


//post 获取验证码
const getCaptcha = (phone,type)=> {
    return dispatch =>{
        dispatch(beginFetch());
        return fetch( port +"/card/tcaptcha?phone="+phone+"&version=v2" ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res =>{
            console.log(res.status);
            return res.json()
        }).then( json => {
            if(json.status){
                console.log('成功获取验证码')
            }else {
                dispatch(showToptipSetTimeOut('验证码获取失败，请重新获取',2))
            }
        }).catch( e =>{
            dispatch(fallFetch('网络请求失败，请重新请求' ,true));
            console.log(e.message)
        });
    }
}


//post  设置新密码
const reSetNewPassword =(valueObj,type) =>{
    return dispatch=>{
        if(valueObj.newPasswordOne !== valueObj.newPasswordTwo){
            dispatch(showToptipSetTimeOut('两次密码不同，请重新输入',2))
            return
        }
        dispatch(beginFetch());
        return fetch( port +"/card/user/updatePassword" ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: valueObj.phone,
                password: valueObj.newPasswordOne,
            })
        }).then( res =>{
            console.log(res.status);
            return res.json()
        }).then( json => {
            if(json.code==='202'){
                dispatch(showToptipSetTimeOut('更新密码成功，请登录',1))
                dispatch(changeTab('login'))
            }else {
                dispatch(showToptipSetTimeOut(json.message,2))
            }
        }).catch( e =>{
            dispatch(fallFetch('网络请求失败，请重新请求' ,true));
            console.log(e.message)
        });
    }
}


//get 验证手机号码是否已经注册 和 验证码是否正确
const phoneAndCaptchaValidation = (valueObj,type ,_subType)=> {
    let url = type===3 ? port+"/card/isPhoneRegistered?phone="+valueObj.phone
        : port +'/card/user/validate?captcha=' + valueObj.captcha + '&phone='+ valueObj.phone
    return dispatch =>{
        dispatch(beginFetch());
        return fetch(url)
            .then(res =>{
                return res.json()
            }).then(json => {
                console.log('存在手机账户')
                if(type===3){   //验证手机号码
                    if(_subType===2){
                        if(json.status){
                            dispatch(showToptipSetTimeOut('该手机号码已存在，请重新填写',2))
                        }else {
                            let i=60;
                            let timer = setInterval(function(){
                                if(i!==0){
                                    i--;
                                    dispatch(countDown(i+'s后重新获取' ,true))
                                }else{
                                    clearInterval(timer);
                                    dispatch(countDown('重新获取' ,false))
                                }
                            },1000);
                            dispatch(getCaptcha(valueObj.phone))
                        }
                    } else{
                        if(json.status){
                            let i=60;
                            let timer = setInterval(function(){
                                if(i!==0){
                                    i--;
                                    dispatch(countDown(i+'s后重新获取' ,true))
                                }else{
                                    clearInterval(timer);
                                    dispatch(countDown('重新获取' ,false))
                                }
                            },1000);
                            dispatch(getCaptcha(valueObj.phone))
                        }else {
                            dispatch(showToptipSetTimeOut('手机号码不存在,请先注册',2))
                        }
                    }
                }else {  //验证 验证码
                    console.log(json)
                    if(json.status){
                        console.log('验证码正确')
                        if(_subType===2){
                            dispatch(fetchInfo(valueObj,type ,_subType))
                        }else {
                            dispatch(showToptipSetTimeOut('验证成功，请设置新密码',1))
                            dispatch(changeTab('reset'))
                        }
                    }else {
                        dispatch(showToptipSetTimeOut('验证码错误，请重新填写',2))
                    }
                }
            }).catch( e=>{
                dispatch(fallFetch('网络请求失败，请重新请求' ,true));
                console.log(e.message)
            })
    }
}


//put 注册 更新个人信息
const upDatePersonalInfo = (valueObj) =>{
    let data = {
        userName: valueObj.name,
        gender: valueObj.gender,
        birthDay: valueObj.birthDay
    }
    return dispatch =>{
        return fetch( port+"/card/user?token="+cookie.load('token'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>{
            return res.json()
        }).then( json =>{
            if(json.code === '202'){
                dispatch(loginSuccess(data))
                dispatch(showToptipSetTimeOut('请选择您感兴趣的模块'),1)
                dispatch(changeTab('interest'))
            }else if(json.code === '666'){
                console.log('账户异常')
            }
        }).catch(e=>{
            dispatch(fallFetch('网络请求失败，请重新请求' ,true));
            console.log(e)
        })
    }
}


//post 上传头像
const upImg = (valueObj)=>{
    return dispatch=>{
        dispatch(beginFetch());
        return fetch( port+"/card/file/base64.method?fileName=" + Math.floor(Math.random()*1000000)+".png" ,{
            method: 'POST',
            body: valueObj.imgBase,
        }).then( res=>{
            return res.json()
        }).then( json=>{
            dispatch(imgUpSuccess(json.url))
            dispatch(showToptipSetTimeOut('头像上传成功'),1)
        }).catch(e=>{
            dispatch(fallFetch('头像上传失败' ,true));
            console.log(e)
        })
    }
}


//get 获取兴趣列表
const getInterestingList = (valueObj)=>{
    return dispatch =>{
        dispatch(beginFetch());
        return fetch( port + '/card/interest?currentPage='+valueObj.currentPage+'&size='+valueObj.size,)
            .then( res=>{
                return res.json()
            })
            .then( json=>{
                return dispatch(setInteresting(json.data.list))
            })
            .catch( e=>{
                console.log(e)
                dispatch(fallFetch('网络请求失败' ,true));
            })
    }
}


//PUT 提交兴趣
const putInterest = (id_Array)=>{
    let ids = id_Array.join('bjzx');
    return dispatch =>{
        return fetch( port+'/card/interest/update/userInterest?token='+cookie.load('token')+'&ids='+ids,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            return res.json()
        }).then( json=>{
            if(json.code === '201'){
                console.log('成功，去提交');
                hashHistory.push({pathname: '/'});
            }else if(json.code === '666'){
                console.log('账户异常')
            }
        }).catch(e=>{
            console.log(e)
            dispatch(fallFetch('网络请求失败' ,true));
        })
    }
}



/*
 * type 和 _subType取值:
 * 登录-1
 * 填写注册信息-2
 * 手机号码是否已注册验证-3
 * 验证码是否正确-5
 * 获取验修改密码验证码-4  新密码设置-6
 * 填写注册的个人信息-7
 * 上传头像-8
 * 获取兴趣列表-9
 * 修改兴趣item的choose状态-10
 * 兴趣选择完成 - 11
 * */
export const shouldFetchGetInfo = (valueObj,type ,_subType)=> {
    return (dispatch, getState) => {
        switch (type){
            case 1:
                if(!valueObj.phone || !valueObj.password){
                    dispatch( showToptipSetTimeOut('请正确写账户信息',2))
                }else {
                    return dispatch(fetchInfo(valueObj,type))
                }
                break;
            case 2:
                console.log(valueObj.isCheck)
                if(!valueObj.isCheck){
                    dispatch( showToptipSetTimeOut('请阅读并同意《用户使用协议》',2))
                    return
                }
                if(!valueObj.phone || !valueObj.password || !valueObj.captcha){
                    dispatch( showToptipSetTimeOut('请正确写信息',2))
                    return
                }
                if(valueObj.password===-1){
                    dispatch( showToptipSetTimeOut('密码格式不正确，请重新输入',2))
                    return
                }
                if(!(phoneRe).test(valueObj.phone)){
                    dispatch(showToptipSetTimeOut('请正确填写手机号码',2))
                    return
                }
                return dispatch(phoneAndCaptchaValidation(valueObj,type,2))
            case 3:
                if(!valueObj.phone){
                    dispatch(showToptipSetTimeOut('请输入手机号码',2))
                }else {
                    if(!(phoneRe).test(valueObj.phone)){
                        dispatch(showToptipSetTimeOut('请填写正确的手机号码',2))
                        return
                    }
                    if(_subType===2){
                        return dispatch(phoneAndCaptchaValidation(valueObj,type,_subType))  //注册时候手机是否已注册
                    }else {
                        return dispatch(phoneAndCaptchaValidation(valueObj,type))
                    }
                }
                break;
            case 5:
                if(!valueObj.phone || !valueObj.captcha){
                    dispatch(showToptipSetTimeOut('请输入手机号码或验证码',2))
                }else {
                    if(!(phoneRe).test(valueObj.phone)){
                        dispatch(showToptipSetTimeOut('请填写正确的手机号码',2))
                        return
                    }
                    return dispatch(phoneAndCaptchaValidation(valueObj,type))
                }
                break;
            case 6:
                if(!valueObj.newPasswordOne || !valueObj.newPasswordTwo){
                    dispatch(showToptipSetTimeOut('请输入密码',2))
                    return
                }
                if(valueObj.newPasswordOne===-1 || valueObj.newPasswordTwo===-1){
                    dispatch(showToptipSetTimeOut('密码格式不正确，请重新输入',2))
                    return
                }
                return dispatch(reSetNewPassword({
                    newPasswordOne: valueObj.newPasswordOne,
                    newPasswordTwo: valueObj.newPasswordTwo,
                    phone: valueObj.phone
                },type))
            case 7:
                if(!valueObj.headPic){
                    dispatch(showToptipSetTimeOut('请上传头像',2))
                    return
                }
                if(!valueObj.name || !valueObj.gender || !valueObj.birthDay){
                    dispatch(showToptipSetTimeOut('请正确填写个人信息',2))
                    return
                }
                return dispatch(upDatePersonalInfo(valueObj));
            case 8:
                if(!valueObj.imgBase){
                    dispatch(showToptipSetTimeOut('图片加载失败，请重新上传',2))
                    return
                }
                if(valueObj.size > 1000*1024){
                    dispatch(showToptipSetTimeOut('上传图片不要大于1MB,请重新上传',2))
                    return
                }
                return dispatch(upImg(valueObj))
            case 9:
                return dispatch(getInterestingList(valueObj));
            case 10:
                return dispatch(changeChooseSate(valueObj))
            case 11:
                console.log(valueObj)
                 if(valueObj.idArray.length===0){
                     dispatch(showToptipSetTimeOut('请选择您感兴趣的',2))
                     return
                 }
                return dispatch(putInterest(valueObj.idArray))
            default:
                return true
        }
    }
}
