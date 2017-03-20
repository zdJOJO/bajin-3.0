/**
 * Created by Administrator on 2017/02/21 0021.
 */
import cookie from 'react-cookie'
import {hashHistory} from 'react-router'

import {
    SHOW_DIALOG,
    SHOW_PAY_POPUP ,
    GET_CIPHERTEXT_SUCCESS,
    SHOW_TOAST_LOADING,
    SHOW_TOAST_SUCCESS,
    CHANGE_SWIPE_INDEX,
    GET_RECOMMENDED_LIST_SUCCESS,
    SHOW_FULL_POPUP,
    SET_HEADPIC_SUCCESS,
    ADD_COLLECTED, CANCLE_COLLECTED, GET_COllECTIONLIST_SUCCESS
} from './actionTypes';

import {dispatchFetchData} from './userAction'
import {port, isTokenExpired, toastSetTimeOut} from '.././public/'
import {hex_md5} from '../public/md5'
import {wxConfig} from '../public/wx/wxConfig'
let token = cookie.load('token');

//密文
const getCiphertextSuccess = text =>{
    return{
        type: GET_CIPHERTEXT_SUCCESS,
        text
    }
};


//弹出满屏popup
export const showFullPopup = isFullPopupShow =>{
    return{
        type: SHOW_FULL_POPUP,
        isFullPopupShow
    }
};


//弹出支付层
export const showPayPopup = isShowPayPopup =>{
    return{
        type: SHOW_PAY_POPUP,
        isShowPayPopup
    }
};


//TOAST提示（正在发表评论、发表评论成功）
export const showToastLoading = isShowToastLoading =>{
    return{
        type: SHOW_TOAST_LOADING,
        isShowToastLoading
    }
};
export const showToastSuccess = (isShowToastSuccess,toastStr) =>{
    return{
        type: SHOW_TOAST_SUCCESS,
        isShowToastSuccess,
        toastStr
    }
};


//显示错误提示
export const showDialog = (isDialogShow, errorStr) =>{
    return{
        type: SHOW_DIALOG,
        isDialogShow,
        errorStr
    }
};


// swiper index
export const changeSwipeIndex = swipeIndex =>{
    return{
        type: CHANGE_SWIPE_INDEX,
        swipeIndex
    }
};


//获取相关列表获取成功
export const getRecommendedListSuccess = list =>{
    return{
        type: GET_RECOMMENDED_LIST_SUCCESS,
        list
    }
};


//设置 个人头像
export const setHeadPicSuccess =(pic)=>{
    return{
        type: SET_HEADPIC_SUCCESS,
        pic
    }
};

//添加收藏、 取消收藏
const addCollectSuccess = (isCollection,collectId)=>{
    return{
        type: ADD_COLLECTED,
        isCollection,
        collectId
    }
};
const cancleCollectSuccess = (isCollection)=>{
    return{
        type: CANCLE_COLLECTED,
        isCollection
    }
};

const getCollectionListSuccess = (list)=>{
    return{
        type: GET_COllECTIONLIST_SUCCESS,
        list
    }
};

/********************************************/

//根据订单号 获取密文 GET
export const getOrderCiphertext = obj =>{
    let url = '';
    if(obj.type === 'scmvOrder'){
        //视频 音频
        url = port + '/card/bank/scmv/pay/'+obj.cardno+'/'+obj.scmvOrderId+'?token='+token;
    }else if(obj.type === 19){
        //工行服务按钮
        url = port + '/card/bank/encryption/'+obj.pickId+'/'+obj.cardNumber+'?token='+token;
    }else if(obj.type === 1){
        //活动支付
        url = port + '/card/bank/encryption/pay/'+obj.cardno+'/'+obj.applyId+'?token='+token;
    }else if(obj.type === 3){
        //臻品订单支付
        url = `${port}/card/bank/goods/pay/${obj.cardno}/${obj.orderId}?token=${token}`;
    }

    return dispatch =>{
        return fetch(url)
            .then( res =>{
                console.log(res)
                return res.text()
            })
            .then( text =>{
                console.log(text);
                dispatch(getCiphertextSuccess(text));
                obj.dom.submit();
            })
            .catch( e =>{
                console.log(e)
            })
    }
};


//生成订单 POST
const generateOrder = obj =>{
    let url = '';
    let data = {};

    //url
    if(obj.type === 'scmvOrder'){
        url = port + '/card/scmvOrder/create?token=' + token + '&tp=' + parseInt(new Date().getTime()/1000, 10);
    }else if(obj.type === 1){
        url = port + '/card/apply?token=' + token;
    }

    // data
    if(obj.type === 'scmvOrder'){
        data = {
            sum: obj.sum,
            price: obj.price,
            scmvOrderMapModels: obj.scmvOrderMapModels
        }
    }else if(obj.type === 1){
        data = obj.data
    }

    return dispatch =>{
        return fetch(url , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res =>{
            return res.json()
        }).then( json =>{
            console.log('json is:', json);
            isTokenExpired(json.code, function () {
                if(json.code==='201'){
                    if(obj.wxPay){
                        /* 微信支付 */
                        dispatch(getWxParam({
                            orderId: json.data.id,
                            ip: window.returnCitySN.cip,
                            type: obj.type
                        }));
                    }else {
                        /* 银行卡支付 */
                        if(obj.type === 'scmvOrder'){
                            dispatch(getOrderCiphertext({
                                type: 'scmvOrder',
                                cardno: '3994',  //现在默认是3994， 其实是要先去银行卡列表页面选择银行卡支付
                                scmvOrderId: json.data.id,
                                dom: obj.dom
                            }));
                        }else if(obj.type === 1){
                            // if(data.applyPrice===0){
                            //     console.log('价格是0，直接跳去 报名成功 页面')
                            // }else {
                            hashHistory.push({
                                pathname : '/myBankCard',
                                query: {
                                    type: 1,
                                    orderId: json.data.id
                                }
                            });
                            // }
                        }
                    }
                }else {
                    dispatch( showDialog(true, json.message))
                }
            });
        }).catch( e =>{
            console.log(e)
        })
    }
};


/*
 *   微信支付 生成订单参数
 *   活动： port + "/card/weixin/getRepay?orderId=" + applyid + "&token=" + token + "&type=1&ipAddress=" + ip
 *   其他： port + "/card/weixin/getRepay?orderId=" + obj.orderId + "&token=" + cookie.load('token') + "&type=0&ipAddress=" + obj.ip;
 * */
export const getWxParam = (obj)=>{
    let url = port + "/card/weixin/getRepay?orderId=" + obj.orderId + "&token=" + cookie.load('token') + `&type=${obj.type===1?1:0}&ipAddress=` + obj.ip;
    return dispatch =>{
        return fetch(url)
            .then( res=>{
                return res.json();
            })
            .then( result =>{
                console.log(result);
                if(result){
                    let appid =  String(result.appId);
                    let nonceStr = String(result.nonceStr);
                    let packageStr = String(result.package);
                    let timeStamp = String(new Date().getTime());
                    let stringA = "appId=" + appid + "&nonceStr=" + nonceStr + "&package=" + packageStr + "&signType=MD5&timeStamp=" + timeStamp ;
                    let stringSignTemp = stringA + "&key=29798840529798840529798840529798";
                    let paySign = hex_md5(stringSignTemp).toUpperCase();   //全部大写

                    let data = {
                        appid: appid,
                        nonceStr: nonceStr,
                        package: packageStr,
                        timeStamp: timeStamp,
                        paySign: paySign,
                        url: location.href+'/'
                    };
                    let wxParamObjOne = data;
                    wxParamObjOne.typeStr = 'wxPay';
                    wxConfig(wxParamObjOne);
                }
            })
            .catch( e=>{
                console.log(e)
            })
    }
};


//获取相关列表 GET
const getRecommendedList = id =>{
    let url = port + '/card/scmv/relate/'+id+'?currentPage=1&size=10';
    return disPatch =>{
        return fetch(url)
            .then( res =>{
                return res.json();
            })
            .then( json =>{
                disPatch(getRecommendedListSuccess(json.data.list))
            })
            .catch( e =>{
                console.log(e);
            })
    }
};


//  上传图片/上传头像  post
// valueObj.type:
// 1 - 个人头像   2 - 其他图片上传
const upImg = (valueObj)=>{
    return dispatch=>{
        return fetch( port+"/card/file/base64.method?fileName=" + Math.floor(Math.random()*1000000)+".png" ,{
            method: 'POST',
            body: valueObj.imgBase
        }).then( res=>{
            return res.json()
        }).then( json=>{
            if(valueObj.type === 1){
                dispatch(setHeadPicSuccess(json.url));
                dispatch(dispatchFetchData({
                    type: 3,
                    data: {
                        headPic: json.url,
                        userName: valueObj.userName,
                        gender: valueObj.gender
                    }
                }))
            }
        }).catch(e=>{
            console.log(e)
        })
    }
};


//收藏 GET
const collectFn = (obj)=>{
    return dispatch =>{
        return fetch(`${port}/card/collect/item?token=${cookie.load('token')}&itemId=${obj.itemId}&itemType=${obj.itemType}`)
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                isTokenExpired(json.code, function () {
                    if(json.code === '205'){
                        //未收藏
                        dispatch(cancleCollectSuccess(false));
                    }else {
                        //已收藏
                        dispatch(addCollectSuccess(true, json.data.collectId));
                    }
                });
            })
            .catch(e =>{
                console.log(e)
            })
    }
};
// 添加收藏  POST
const addCollectFn = (obj)=>{
    return dispatch =>{
        return fetch( `${port}/card/collect?token=${cookie.load('token')}` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemId: obj.itemId,
                itemType: obj.itemType
            })
        } )
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                isTokenExpired(json.code, function () {
                    dispatch(collectFn({
                        itemType: obj.itemType,
                        itemId: obj.itemId
                    }));
                    dispatch(showToastSuccess(true,'收藏成功'));
                    setTimeout(()=>{
                        dispatch(showToastSuccess(false,'收藏成功'));
                    },1000)
                });
            })
            .catch(e =>{
                console.log(e)
            })
    }
};
//取消收藏 DELETE
const cancleCollectFn = (obj)=>{
    return dispatch =>{
        return fetch( `${port}/card/collect/${obj.collectId}?token=${cookie.load('token')}`, {
            method: 'DELETE'
        } )
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                isTokenExpired(json.code, function () {
                    dispatch(collectFn({
                        itemType: obj.itemType,
                        itemId: obj.itemId
                    }));
                    dispatch(showToastSuccess(true,'已取消收藏'));
                    setTimeout(()=>{
                        dispatch(showToastSuccess(false,'已取消收藏'));
                    },1000)
                });
            })
            .catch(e =>{
                console.log(e)
            })
    }
};
//获取列表  GET
const getCollectionList = ()=>{
    return dispatch =>{
        return fetch(``)
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                isTokenExpired(json.code, function () {
                    dispatch(getCollectionListSuccess(json.list));
                });
            })
            .catch(e =>{
                console.log(e)
            })
    }
};


/* * 收藏  type:
 *  1 - 查询收藏
 *  2 - 添加收藏
 *  3 - 取消收藏
 *  4 - 获取列表
 * */
export const fetchCollect =(obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 1:
                return  dispatch( collectFn(obj) );
            case 2:
                return  dispatch( addCollectFn(obj) );
            case 3:
                return  dispatch( cancleCollectFn(obj) );
            case 4:
                return dispatch(getCollectionList());
            default:
                return false
        }
    }
};


/*
*type:
* 1 ： 活动支付
* scmvOrder: 课程模块订单
* 19： 工行服务的按钮
* */
export const disPatchFetchOrder =(obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 'scmvOrder':
                return dispatch( generateOrder(obj) );
            case 1:
                return dispatch( generateOrder(obj) );
            case 19:
                return dispatch( getOrderCiphertext(obj) );
            default:
                return false;
        }
    }
};


/* 详情内 相关推荐列表  */
export const disPatchFetchList = id =>{
    return dispatch =>{
        return dispatch(getRecommendedList(id))
    }
};


/* 上传 图片 */
export const upImgFn = (obj) =>{
    return dispatch =>{
        if(obj.size > 1000*1024*5){
            // dispatch(showToptipSetTimeOut('上传图片不要大于1MB,请重新上传',2));
            console.log('上传图片不要大于5MB,请重新上传');
            return
        }
        return dispatch(upImg(obj))
    }
};














