/**
 * Created by Administrator on 2017/03/13 0013.
 */

import {port} from '../public'

import {
    GET_GOODDETAIL_SUCCESS,GET_SKULIST_SUCCESS,
    CHANGE_CHOOSE_SKU
} from './actionTypes'


//获取详情成功
const getGoodDetailSuccess = info =>{
    return{
        type: GET_GOODDETAIL_SUCCESS,
        info
    }
};

//获取 规格列表
const getSkuListSuccess = list =>{
    return{
        type: GET_SKULIST_SUCCESS,
        list
    }
};

//变动被选择的规格
export const changeChooseSku = sku =>{
    return{
        type: CHANGE_CHOOSE_SKU,
        sku
    }
};


//获取臻品 详情  GET
const getGoodDetail =(obj)=>{
    let url = !obj.sku ? port + '/card/goods/' + obj.id : port + '/card/goods/' + obj.id + '/sku';
    return dispatch =>{
        return fetch( url )
            .then( res =>{
                return res.json();
            })
            .then( json=>{
                if(obj.sku){
                    dispatch(getSkuListSuccess(json))
                }else {
                    dispatch(getGoodDetailSuccess(json))
                }
            })
            .catch( e =>{
                console.log(e)
            })
    }
}


/*
*  obj.type ：
*  1 - 获取详情
*
* */
export const fetchInfo = obj =>{
    return dispatch =>{
        switch (obj.type) {
            case 1:
                return dispatch(getGoodDetail(obj));
            case 2:
                return dispatch(getGoodDetail(obj));
            default:
                return false
        }
    }
};