/**
 * Created by Administrator on 2017/02/21 0021.
 */
import cookie from 'react-cookie'

import {
    SHOW_DIALOG,
    SHOW_PAY_POPUP ,
    POST_CIPHERTEXT,
    SHOW_TOAST_LOADING,
    SHOW_TOAST_SUCCESS,
    CHANGE_SWIPE_INDEX,
    GET_RECOMMENDED_LIST_SUCCESS,
    SHOW_FULL_POPUP,
    SET_HEADPIC_SUCCESS
} from './actionTypes';

import {dispatchFetchData} from './userAction'

import {port} from '.././public/'
let token = cookie.load('token');

//密文
const postCiphertext = text =>{
    return{
        type: POST_CIPHERTEXT,
        text
    }
}


//弹出满屏popup
export const showFullPopup = isFullPopupShow =>{
    return{
        type: SHOW_FULL_POPUP,
        isFullPopupShow
    }
}


//弹出支付层
export const showPayPopup = isShowPayPopup =>{
    return{
        type: SHOW_PAY_POPUP,
        isShowPayPopup
    }
}


//TOAST提示（正在发表评论、发表评论成功）
export const showToastLoading = isShowToastLoading =>{
    return{
        type: SHOW_TOAST_LOADING,
        isShowToastLoading
    }
}
export const showToastSuccess = isShowToastSuccess =>{
    return{
        type: SHOW_TOAST_SUCCESS,
        isShowToastSuccess
    }
}


//显示错误提示
export const showDialog = isDialogShow =>{
    return{
        type: SHOW_DIALOG,
        isDialogShow
    }
}


// swiper index
export const changeSwipeIndex = swipeIndex =>{
    return{
        type: CHANGE_SWIPE_INDEX,
        swipeIndex
    }
}


//获取相关列表获取成功
export const getRecommendedListSuccess = list =>{
    return{
        type: GET_RECOMMENDED_LIST_SUCCESS,
        list
    }
}


//设置 个人头像
export const setHeadPicSuccess =(pic)=>{
    return{
        type: SET_HEADPIC_SUCCESS,
        pic
    }
}



//根据订单号 获取密文 GET
const getOrderCiphertext = obj =>{
    let url = '';
    if(obj.type === 'scmvOrder'){
        //视频 音频
        url = port + '/card/bank/scmv/pay/'+obj.cardno+'/'+obj.scmvOrderId+'?token='+token;
    }else if(obj.type === 19){
        //工行服务按钮
        url = port + '/card/bank/encryption/'+obj.pickId+'/'+obj.cardNumber+'?token='+token;
    }
    return dispatch =>{
        return fetch(url)
            .then( res =>{
                console.log(res)
                return res.text()
            })
            .then( text =>{
                console.log(text);
                dispatch(postCiphertext(text));
                obj.dom.submit();
            })
            .catch( e =>{
                console.log(e)
            })
    }
}


//生成订单 POST
const generateOrder = obj =>{
    let url = '';
    let data = {};
    if(obj.type === 'scmvOrder'){
        url = port + '/card/scmvOrder/create?token=' + token + '&tp=' + parseInt(new Date().getTime()/1000, 10)
    }else if(obj.type === 1){
        url = port + '/card/apply?token=' + token
    }

    if(obj.type === 'scmvOrder'){
        data = {
            sum: obj.sum,
            price: obj.price,
            scmvOrderMapModels: obj.scmvOrderMapModels
        }
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
            console.log('json is:')
            console.log(json)
            dispatch(getOrderCiphertext({
                type: 'scmvOrder',
                cardno: '3994',
                scmvOrderId: json.data.id,
                dom: obj.dom
            }))
        }).catch( e =>{
            console.log(e)
        })
    }
}


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
}


//  上传图片/上传头像  post
// valueObj.type:
// 1 - 个人头像   2 - 其他图片上传
const upImg = (valueObj)=>{
    return dispatch=>{
        return fetch( port+"/card/file/base64.method?fileName=" + Math.floor(Math.random()*1000000)+".png" ,{
            method: 'POST',
            body: valueObj.imgBase,
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
}


/* 详情内 相关推荐列表  */
export const disPatchFetchList = id =>{
    return dispatch =>{
        return dispatch(getRecommendedList(id))
    }
};


// 上传 图片
export const upImgFn = (obj) =>{
    return dispatch =>{
        if(obj.size > 1000*1024){
            // dispatch(showToptipSetTimeOut('上传图片不要大于1MB,请重新上传',2));
            return
        }
        return dispatch(upImg(obj))
    }
}