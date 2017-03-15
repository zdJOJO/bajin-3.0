/**
 * Created by Administrator on 2017/03/15 0015.
 */

import { port } from '../public'
import cookie from 'react-cookie'

import {
   ORDER_LOADING, GET_ORDERLIST_SUCCESS
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


/*
*  obj.type
*  1 - 修改 tab
*  2 - 修改 status
*  3 - 获取订单
* */
export const fetchOrderList =(obj)=>{
    return dispatch =>{
       switch (obj.type) {
           case 1:
//               dispatch(changeOrderTab(obj.orderTab));
               dispatch(getOrderList(obj));
               break;
           case 2:
//               dispatch(changeOrderStatus(obj.status));
               dispatch(getOrderList(obj));
               break;
           case 3:
               return dispatch(getOrderList(obj));
           default:
               return false;
       }
    }
};