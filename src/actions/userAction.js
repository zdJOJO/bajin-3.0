/**
 * Created by Administrator on 2017/03/03 0003.
 */

import cookie from 'react-cookie'
import {port, isTokenExpired} from '../public/index'
import {
    GET_BANKLIST_SUCCESS
} from './actionTypes';




// 成功获取银行卡列表
const getBankListSuccess = list =>{
    return{
        type: GET_BANKLIST_SUCCESS,
        list
    }
}


// 获取银行卡列表  GET
const getBankList =()=>{
    return dispatch =>{
        return fetch( port + '/card/card?token=' + cookie.load('token'))
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                isTokenExpired(json.code,function () {
                    dispatch(getBankListSuccess(json.list))
                });
            })
            .catch( e =>{
                console.log(e)
            })
    }
}


/*
*  type:
*  1 - 
*  2 - 获取银行卡列表
* */
export const dispatchFetchData = (obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 1:
                return
            case 2:
                return dispatch(getBankList(obj))
            default:
                return false
        }
    }
}