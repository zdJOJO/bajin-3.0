/**
 * Created by Administrator on 2016/12/23 0023.
 */

import {port} from '.././public/'

import {
    BEGIN_GET_COMMENT,
    DONE_GET_COMMENT ,
    FAIL_GET_COMMENT ,
    PUBLISH_COMMENT,
    CHANGE_PLACEHOLDER
} from './actionTypes';

//发表评论
export const publishComment = ()=> {
    return {
        type: PUBLISH_COMMENT
    }
}

const changePlaceholder = str =>{
    return{
        type: CHANGE_PLACEHOLDER,
        str
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



//获取评论列表
const fetchComment = obj => {
    return dispatch =>{
        dispatch(beginGetComment(obj.page));
        return fetch( port + '/card/comment/list?currentPage='+obj.page+'&type='+obj.itemType+'&itemId='+obj.itemId)
            .then(res => {
                console.log(res.status);
                return res.json()
            })
            .then(data => {
                if(data.list.length===0){
                    obj.isListNull = true
                    if(!obj.isInDetail){
                        setTimeout(function () {
                            dispatch(doneGetComment(data ,obj.isListNull ,obj.isInDetail))
                        },3000)
                    }else {
                        dispatch(doneGetComment(data ,obj.isListNull ,obj.isInDetail))
                    }
                    return
                }
                dispatch(doneGetComment(data ,obj.isListNull ,obj.isInDetail))
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

//type: 1-修改placeholder
export const dispatchAction =(type,obj)=>{
    return dispatch=>{
        if(type===1){
            return dispatch(changePlaceholder(obj.str))
        }
    }
}
