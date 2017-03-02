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
    GET_RECOMMENDED_LIST_SUCCESS
} from './actionTypes';

import {port} from '.././public/'
let token = cookie.load('token');

//密文
const postCiphertext = text =>{
    return{
        type: POST_CIPHERTEXT,
        text
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


//根据订单号 获取密文 GET
const getOrderCiphertext = obj =>{
    let url = port + '/card/bank/scmv/pay/'+obj.cardno+'/'+obj.scmvOrderId+'?token='+token;
    return dispatch =>{
        return fetch(url)
            .then( res =>{
                console.log(res)
                return res.text()
            })
            .then( text =>{
                console.log(text)
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



/*
*type:
* 1 ： 活动支付
* scmvOrder: 课程模块订单
*
* */
export const disPatchFetchOrder =(obj)=>{
    console.log(obj)
    return dispatch =>{
        switch (obj.type){
            case 'scmvOrder':
                return dispatch( generateOrder(obj) )
            case 1:
                return dispatch( generateOrder(obj) )
            default:
                return false
        }
    }
}


/* 详情内 相关推荐列表  */
export const disPatchFetchList = id =>{
    return dispatch =>{
        return dispatch(getRecommendedList(id))
    }
}