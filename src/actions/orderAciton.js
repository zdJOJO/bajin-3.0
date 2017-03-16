/**
 * Created by Administrator on 2017/03/15 0015.
 */

import { port, isTokenExpired } from '../public'
import cookie from 'react-cookie'

import {
    ORDER_LOADING, GET_ORDERLIST_SUCCESS, ORDER_DELETE_SUCCESS,
    GET_ORDER_ADDRESS
} from './actionTypes'

//加载
const isLoading = (isLoading, _isHideMore) =>{
    return{
        type: ORDER_LOADING,
        isLoading,
        _isHideMore
    }
};

//获取订单成功
export const getOrderListSuccess = (list, orderTab, status, page)=>{
    return{
        type: GET_ORDERLIST_SUCCESS,
        list,
        orderTab,
        status,
        page
    }
};

const orderDeleteSuccess = (isShowDeleteSuccess)=>{
    return{
        type: ORDER_DELETE_SUCCESS,
        isShowDeleteSuccess
    }
};

const getOrderAddressSuccess = (address)=>{
    return{
        type: GET_ORDER_ADDRESS,
        address
    }
};


/*****************************/
//获取订单
const getOrderList = obj =>{
    let url = '';
    if(obj.orderTab === 0){
        url = port + '/card/apply?currentPage='+obj.page+'&token='+cookie.load('token') ;
    }else if(obj.orderTab === 1){
        url = `${port}/card/order/v2?currentPage=${obj.page}&orderState=${obj.status}&token=${cookie.load('token')}`;
    }else {
        url = `${port}/card/order/v2?currentPage=${obj.page}&orderState=${obj.status}&token=${cookie.load('token')}`;
    }

    return dispatch =>{
        dispatch(isLoading(true));
        return fetch( url )
            .then( res =>{
                return res.json()
            })
            .then( json=>{
                if(json.list.length > 0){
                    dispatch(isLoading(false));
                }
                if(json.list.length === 0 && obj.page > 1){
                    setTimeout(()=>{
                        dispatch(isLoading(false, true));
                    },3000)
                }
                dispatch(getOrderListSuccess(json.list, obj.orderTab, obj.status, obj.page));
            })
            .catch( e=>{
                console.log(e)
            })
    }
};


//取消订单
const deleteOrder = (obj) =>{
    return dispatch =>{
        return fetch( `${port}/card/order/${obj.orderId}?token=${cookie.load('token')}`, {
            method: 'DELETE'
        } )
            .then( res =>{
                return res.json()
            })
            .then( json=>{
                isTokenExpired(json.code, function () {
                    dispatch(orderDeleteSuccess(true));
                    setTimeout(()=>{
                        dispatch(orderDeleteSuccess(false));
                        dispatch(getOrderList(obj));
                    },1000)
                });
            })
            .catch( e=>{
                console.log(e)
            })
    }
};

//根据订单号获取收货地址
const getOrderAddress = (obj)=>{
    return dispatch =>{
        return fetch( `${port}/card/receiver/${obj.receiveId}?token=${cookie.load('token')}` )
            .then( res =>{
                return res.json()
            })
            .then( json=>{
                dispatch(getOrderAddressSuccess(json))
            })
            .catch( e=>{
                console.log(e)
            })
    }
};


/*
*  obj.type
*  1 - 修改 tab
*  2 - 修改 status
*  3 - 获取订单
*  4 - 取消订单
*  5 - 根据订单号获取收货地址
* */
export const fetchOrderList =(obj)=>{
    return dispatch =>{
       switch (obj.type) {
           case 1:
               dispatch(getOrderList(obj));
               break;
           case 2:
               dispatch(getOrderList(obj));
               break;
           case 3:
               return dispatch(getOrderList(obj));
           case 4:
               return dispatch(deleteOrder(obj));
           case 5:
               return dispatch(getOrderAddress(obj));
           default:
               return false;
       }
    }
};