/**
 * Created by Administrator on 2016/12/23 0023.
 */
import cookie from 'react-cookie'
import { hashHistory } from 'react-router';
import {port} from '.././public/'

import {
    BEGIN_GET_COMMENT,
    DONE_GET_COMMENT ,
    FAIL_GET_COMMENT ,
    PUBLISH_COMMENT,
    CHANGE_HEADERSTR,
    CHANGE_COMMENT_VALUE
} from './actionTypes';
import {
    showDialog ,showToastLoading ,showToastSuccess
} from './publicAction'

//去空格
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//发表评论
const publishComment = ()=> {
    return {
        type: PUBLISH_COMMENT
    }
}


//改变placeholder
const changeHeaderStr = (obj) =>{
    let str = obj.str;
    let isFather = obj.isFather;
    let fatherId = obj.fatherId;
    return{
        type: CHANGE_HEADERSTR,
        str,
        isFather,
        fatherId
    }
}


//评论内容
const commentValue = obj =>{
    let commentValue = obj.str;
    let isFather = obj.isFather;
    let fatherId = obj.fatherId;
    return {
        type: CHANGE_COMMENT_VALUE,
        commentValue,
        isFather,
        fatherId
    }
}


//开始获取
export const beginGetComment = (page)=> {
    return {
        type: BEGIN_GET_COMMENT,
        page
    }
}

//获取成功
export const doneGetComment = (data,isListNull,isInDetail) => {
    return {
        type: DONE_GET_COMMENT,
        data,
        isListNull,
        isInDetail
    }
}

//获取失败
export const fallGetCommet = page => {
    return {
        type: FAIL_GET_COMMENT,
        page
    }
}


// 发表评论
const fetchPublishCmt = obj =>{
    return dispatch =>{
        let token = cookie.load('token');
        let url = port + '/card/commentv2/create?token='+token+'&tp='+ parseInt(new Date().getTime()/1000);
        let data = obj.publishCmtObj;
        if(data.commentContent.slice(0,data.headerStrLength) === data.headerStr){
            if(data.headerStr === data.commentContent){
                dispatch(showDialog(true))
                return
            }else {
                data.commentContent = data.commentContent.substring(data.headerStrLength)
            }
        }
        if(data.commentContent.trim().length===0){
            dispatch(showDialog(true))
            return
        }
        dispatch(showToastLoading(true));
        return fetch( url , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        } ).then( res =>{
            return res.json()
        }).then( json =>{
            if(json.code==='666'){
                cookie.remove('token')
                hashHistory.push({
                    pathname: '/login',
                    query: {isNeedBack: 1}
                })
                return
            }

            dispatch(showToastLoading(false));
            dispatch(showToastSuccess(true))
            setTimeout(()=>{
                dispatch(showToastSuccess(false))
            },1200)
            dispatch(fetchComment(obj.getCmtObj));
            dispatch(commentValue({
                str: '',
                isFather: 0,
                fatherId: 0
            }))
        }).catch( e=>{
            console.log(e)
            dispatch(fallGetCommet())
        })
    }
}



//获取评论列表 GET
const fetchComment = obj => {
    return dispatch =>{
        dispatch(beginGetComment(obj.page));

        let url = port + '/card/commentv2?currentPage='+obj.page+'&size=10&type='+obj.itemType+'&itemId='+obj.itemId ;
        
        return fetch( url )
            .then(res => {
                console.log(res.status);
                return res.json()
            })
            .then(data => {
                let dataList = data.data;
                if(dataList.list.length===0){
                    obj.isListNull = true
                    if(!obj.isInDetail){
                        setTimeout(function () {
                            dispatch(doneGetComment(dataList ,obj.isListNull ,obj.isInDetail))
                        },3000)
                    }else {
                        dispatch(doneGetComment(dataList ,obj.isListNull ,obj.isInDetail))
                    }
                    return
                }
                dispatch(doneGetComment(dataList ,obj.isListNull ,obj.isInDetail))
            })
            .catch(e => {
                console.log(e.message)
                dispatch(fallGetCommet(obj.page));
            })
    }
}


//提供组件 调用
export const getCommentList = (obj)=> {
    if(!obj.isListNull)  obj.page++;
    if(obj.isInDetail) obj.page=1;
    return (dispatch, getState) => {
        return dispatch(fetchComment(obj))
    }
}

/*
* type:
* 1 : 修改placeholder
* 2 : 发表评论
* 3 : 获取评论内容
* */
export const dispatchAction =(type,obj)=>{
    return dispatch=>{
        if(type===1){
            return dispatch(changeHeaderStr(obj))
        }else if(type === 2){
            if(!cookie.load('token')){
                hashHistory.push({
                    pathname: '/login',
                    query: {isNeedBack: 1}
                })
                return
            }
            return dispatch(fetchPublishCmt(obj))
        }else if(type === 3){
            return dispatch(commentValue(obj))
        }
    }
}
