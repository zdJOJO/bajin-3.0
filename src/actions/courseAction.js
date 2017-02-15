/**
 * Created by Administrator on 2017/02/13 0013.
 */
import {port} from '../public/index'
import {
    BEGIN_FETCH,
    FALL_FETCH,
    DONE_GET_COURSELIST
} from './actionTypes'

//开始发起请求
const beginGetActList = ()=>{
    return {
        type: BEGIN_FETCH
    }
}

//获取失败
const fallGetActList = ()=> {
    return {
        type: FALL_FETCH
    }
}

//获取列表成功
const successGetCourseList =(list)=>{
    return{
        type: DONE_GET_COURSELIST,
        list
    }
}


//get 获取列表
// http://121.196.232.233/card/scmv?currentPage={currentPage}&size={size}&type={type}&isFather={isFather}
// type:  0全部 1课程 2视频 3音频    isFather: 0-单个  1-集合
const fetchActList =(page,type)=>{
    let url = port + '/card/scmv?currentPage='+page+'&size=10&type='+type+'&isFather=1';
    return dispatch =>{
        dispatch(beginGetActList());
        return fetch(url)
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(data => {
                dispatch(successGetCourseList(data.data.list))
            })
            .catch(e =>{
                dispatch(fallGetActList())
                console.log(e)
            })
    }
}


export const getCourseList = (page,type) => {
    return (dispatch, getState) => {
        return dispatch(fetchActList(page,type))
    }
}
