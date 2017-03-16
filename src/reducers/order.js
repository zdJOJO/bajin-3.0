/**
 * Created by Administrator on 2017/03/15 0015.
 */

import {
    ORDER_LOADING, GET_ORDERLIST_SUCCESS, ORDER_DELETE_SUCCESS,
    GET_ORDER_ADDRESS
} from '../actions/actionTypes'

const initState = {
    isHideMore: false,
    isLoading: false,
    isShowDeleteSuccess: false, //删除成功
    orderTab: 0,   // 0-活动  1-臻品  2-课程
    orderStatus: 0,  // 0-全部 1-待付款 2-已付款（待发货） 3-已发货
    orderList: [],
    receiveAddress: {}  //每个订单的收货地址
};

export default function orderReducer (state=initState, action) {
    switch (action.type){
        case ORDER_LOADING:
            return{
                ...state,
                isLoading:　action.isLoading,
                isHideMore: !action._isHideMore
            };
        case GET_ORDERLIST_SUCCESS:
            if(action.orderTab === state.orderTab){
                return{
                    ...state,
                    orderTab: action.orderTab,
                    orderStatus: action.status,
                    orderList: action.page=== 1 ? action.list : state.orderList.concat(action.list)
                }
            }else {
                return{
                    ...state,
                    orderTab: action.orderTab,
                    orderStatus: action.status,
                    orderList: action.list
                }
            }
            break;
        case ORDER_DELETE_SUCCESS:
            return{
                ...state,
                isShowDeleteSuccess:　action.isShowDeleteSuccess
            };
        case GET_ORDER_ADDRESS:
            return{
                ...state,
                receiveAddress: action.address
            }
        default:
            return state
    }
}