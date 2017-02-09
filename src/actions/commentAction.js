/**
 * Created by Administrator on 2016/12/23 0023.
 */

import {port} from '.././public/'

import {
    BEGIN_GET_COMMENT,
    DONE_GET_COMMENT ,
    FAIL_GET_COMMENT ,
    PUBLISH_COMMENT
} from './actionTypes';

//发表评论
export const publishComment = ()=> {
    return {
        type: PUBLISH_COMMENT
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
export const fallGetCommet = (page)=> {
    return {
        type: FAIL_GET_COMMENT,
        page
    }
}


//提供组件 调用
export function getCommentList(itemType,itemId,page,isListNull,isInDetail) {
    if(!isListNull)  page++
    if(isInDetail) page=1
    return (dispatch, getState) => {
        return dispatch(fetchComment(itemType,itemId,page,isListNull,isInDetail))
    }
}



//获取评论列表
function fetchComment(itemType,itemId,page,isListNull,isInDetail) {
    return dispatch =>{
        dispatch(beginGetComment(page));
        return fetch( port + '/card/comment/list?currentPage='+page+'&type='+itemType+'&itemId='+itemId)
            .then(res => {
                console.log(res.status);
                return res.json()
            })
            .then(data => {
                if(data.list.length===0){
                    isListNull = true
                    setTimeout(function () {
                        dispatch(doneGetComment(data,isListNull,isInDetail))
                    },3000)
                    return
                }
                dispatch(doneGetComment(data,isListNull,isInDetail))
            })
            .catch(e => {
                console.log(e.message)
                dispatch(fallGetCommet(page));
            })
    }
}
