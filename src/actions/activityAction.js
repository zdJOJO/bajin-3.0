/**
 * Created by Administrator on 2017/01/09 0009.
 */
import { hashHistory } from 'react-router';
import cookie from 'react-cookie';
import {port} from '../public/index'
import {
    BEGIN_FETCH,
    DONE_GET_ActList,
    DONE_GET_DETAIL ,
    FALL_FETCH,
    POPUP,
    SUBMIT_ACTINFO_SUCCESS,
    SHOW_DIALOG,
    ACT_SHOW_MORE,
    ACT_SHOW_BACK_TOP,
    GET_USER_JOINACT_STATUS
} from './actionTypes';


//开始发起请求
const beginGetActList = ()=>{
    return {
        type: BEGIN_FETCH
    }
}

//活动列表 请求成功
export const successGetActList = (data,isRefresh)=>{
    return{
        type: DONE_GET_ActList,
        data,
        isRefresh
    }
}

//活动详情 请求成功
export const successGetActDetail = (data)=>{
    return{
        type: DONE_GET_DETAIL ,
        data
    }
}

//获取失败
const fallGetActList = ()=> {
    return {
        type: FALL_FETCH,
    }
}

//发起活动的 POPUP 的显示隐藏
export const popup = popupIsShow =>{
    return {
        type: POPUP,
        popupIsShow
    }
}

//提交发起活动信息
export const submitInfoSuccess = (showToast)=>{
    return{
        type: SUBMIT_ACTINFO_SUCCESS,
        showToast
    }
}

//显示错误提示
export const showDialog = (isDialogShow)=>{
    return{
        type: SHOW_DIALOG,
        isDialogShow
    }
}

//展示更多
export const actShowMore = isShowMore =>{
    return{
        type: ACT_SHOW_MORE,
        isShowMore
    }
}

//回到顶部
export const actBackTop = isBackTop =>{
    return{
        type: ACT_SHOW_BACK_TOP,
        isBackTop
    }
}

// 成功 获取 用户活动报名 状态
const userActStatusGetSuccess = status =>{
    return{
        type: GET_USER_JOINACT_STATUS,
        status
    }
}



function fetchActList(page,isRefresh) {
    return dispatch =>{
        dispatch(beginGetActList());
        return fetch( port + '/card/activity?currentPage='+page+'&size=10')
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(data => {
                dispatch(successGetActList(data,isRefresh))
            })
            .catch(e =>{
                dispatch(fallGetActList());
                console.log(e)
            })
    }
}

function fetchActDetail(itemId) {
    return dispatch =>{
        return fetch( port + '/card/activity/'+itemId)
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(json => {
                dispatch(successGetActDetail(json))
            }).catch(e =>{
                console.log(e)
            })
    }
}

function fetchPostInfo(infoObj) {
    return dispatch=>{
        return fetch( port+"/card/activityDriver/create?token="+cookie.load('token') ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoObj)
        }).then( res=>{
            return res.json()
        }).then( json=>{
            if(json.code==='201'){
                dispatch(submitInfoSuccess(true))
                setTimeout(()=>{
                    dispatch(submitInfoSuccess(false))
                    dispatch(popup(false))
                },1500)
            }else if(json.code==='666'){
                cookie.remove('token');
                hashHistory.push({pathname: '/login'})
            }
        }).catch(e=>{
            console.log(e)
        })
    }
}


// get  获取用户本活动报名信息
const getUserActStatus = (obj)=>{
    return dispatch =>{
        return fetch( port + '/card/apply/status/'+obj.activityId+'?token='+cookie.load('token'))
            .then(res =>{
                return res.json()
            })
            .then( json =>{
                dispatch(userActStatusGetSuccess(json.data))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}




export const getActList = (page,isRefresh) => {
    return (dispatch, getState) => {
        return dispatch(fetchActList(page,isRefresh))
    }
}

export const getActDetail = (itemId) => {
    return (dispatch, getState) => {
        return dispatch(fetchActDetail(itemId))
    }
}


export const postActInfo = infoObj =>{
    return(dispatch)=>{
        return dispatch(fetchPostInfo(infoObj))
    }
};



/*
*  obj.type:
*  1 - 查询用户报名情况
*  2 - 报名
* */
export const disPatchActFetch = (obj) => {
    return dispatch =>{
        switch (obj.type){
            case 1:
                return dispatch(getUserActStatus({
                    activityId: obj.activityId
                }));
            default:
                return false
        }
    }
}





