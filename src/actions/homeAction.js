/**
 * Created by Administrator on 2017/02/27 0027.
 */

// import { hashHistory } from 'react-router';
// import cookie from 'react-cookie';
import {port} from '../public/index'

import {
    GET_BANNER_SUCCESS,
    GET_ICBC_BTN_SUCCESS,
    GET_HOME_CONTENTLIST_SUCCESS
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


// 获取首页内容列表
const getHomeContentListSuccess = list =>{
    for(let item of list){
        if(item.type === 2){
            item.type2FirsElement = item.hcpageModels[0];
            item.hcpageModels.splice(0,1);
        }
    }
    return{
        type: GET_HOME_CONTENTLIST_SUCCESS,
        list
    }
}



//获取数据  GET
const getHomeData =(obj)=>{
    let url = '';
    switch (obj.type){
        case 1:
            url = port + '/card/banner';
            break;
        case 2:
            url = port + '/card/icbcbutton';
            break;
        case 3:
            url = port + '/card/hcpage?currentPage='+obj.page+'&size=100&isDelete=2';
            break
        default:
            return false
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
                }else if(obj.type === 3) {
                    dispatch(getHomeContentListSuccess(json.data.list))
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
* 3 - 获取首页内容列表
* */

export const fetchData = (obj)=>{
    return dispatch =>{
        return dispatch(getHomeData(obj));
    }
}