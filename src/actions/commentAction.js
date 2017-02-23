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

       // let url = port + '/card/comment/list?currentPage='+obj.page+'&type='+obj.itemType+'&itemId='+obj.itemId

        //假数据
        let url = 'http://test.winthen.com/card/commentv2?size=10&currentPage=1&type=29&itemId=7&isAudit=0'

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

//type: 1-修改placeholder
export const dispatchAction =(type,obj)=>{
    return dispatch=>{
        if(type===1){
            return dispatch(changePlaceholder(obj.str))
        }
    }
}
