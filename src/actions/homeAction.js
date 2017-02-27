/**
 * Created by Administrator on 2017/02/27 0027.
 */

// import { hashHistory } from 'react-router';
// import cookie from 'react-cookie';
import {port} from '../public/index'

import {
    GET_BANNER_SUCCESS,
    GET_ICBC_BTN_SUCCESS
} from './actionTypes'


// banner   获取成功
const getBannerListSuccess = list =>{
    return {
        type: GET_BANNER_SUCCESS,
        list
    }
}


// 工行服务 按钮  isHome判断是否是在首页   true-是  false-不是
const getIcbcBtnSuccess = (btnList, isHome) =>{
    let list = btnList;
    if(isHome){
        list = btnList.slice(0,4)
        return {
            type: GET_ICBC_BTN_SUCCESS,
            list
        }
    }else {
        return {
            type: GET_ICBC_BTN_SUCCESS,
            list
        }
    }
}


//获取数据  GET
const getHomeData =(obj)=>{
    let url = '';
    switch (obj.type){
        case 1:
            url = port + '/card/banner';
            break
        case 2:
            url = port + '/card/icbcbutton';
    }
    return dispatch =>{
        return fetch(url)
            .then( res =>{
                return res.json();
            })
            .then( json =>{
                if(obj.type === 1){
                    dispatch(getBannerListSuccess(json.list))
                }else if(obj.type === 2){
                    dispatch(getIcbcBtnSuccess(json.list, obj.isHome))
                }
            })
            .catch( e =>{
                console.log(e)
            })
    }
}




/*
* 获取数据
* obj.type 取值：
* 1 - 获取首页banner
* 2 - 获取工行服务按钮
*
* */

export const fetchData = (obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 1:
                dispatch(getHomeData(obj));
                break
            case 2:
                dispatch(getHomeData(obj))
        }
    }
}