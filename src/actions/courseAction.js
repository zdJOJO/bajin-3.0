/**
 * Created by Administrator on 2017/02/13 0013.
 */
import {port} from '../public/index'
import {
    BEGIN_FETCH,
    FALL_FETCH,
    DONE_GET_COURSELIST,
    DONE_GET_COURSEDETAIL,
    SHOW_MORE_COURSEDETAIL,
    SHOW_BACK_TOP
} from './actionTypes'



//显示更多内容
export const showMoreCourseDetail =(isShow)=>{
    return{
        type: SHOW_MORE_COURSEDETAIL,
        isShow
    }
}

//回到顶部 是否显示
export const backTop =(isBackTop)=>{
    return{
        type: SHOW_BACK_TOP,
        isBackTop
    }
}

//开始发起请求
const beginGet = ()=>{
    return {
        type: BEGIN_FETCH
    }
}

//获取失败
const fallGet = ()=> {
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

//获取详情信息成功
const successGetCourseDetail =(info)=>{
    return{
        type: DONE_GET_COURSEDETAIL,
        info
    }
}


//get 获取列表
// type:  0全部 1时修 2视频 3音频    isFather: 0-单个  1-集合
const getCourseList =(page,type)=>{
    let url = port + '/card/scmv?currentPage='+page+'&size=10&type='+type+'&isFather=1';
    return dispatch =>{
        dispatch(beginGet());
        return fetch(url)
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(data => {
                dispatch(successGetCourseList(data.data.list))
            })
            .catch(e =>{
                dispatch(fallGet())
                console.log(e)
            })
    }
}


//get 课程详情 http://121.196.232.233/card/scmv/{id}?
const getCourseDetail = (_id)=>{
    return dispatch =>{
        dispatch(beginGet());
        return fetch( port + '/card/scmv/' + _id )
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(data => {
                dispatch(successGetCourseDetail(data.data))
            })
            .catch(e =>{
                dispatch(fallGet())
                console.log(e)
            })
    }
}




/*
* type: 0-课程全部列表  -1-课程详情  -2-更新详情是否显示更多
* 当page为-1时，说明没用
* */
export const fetchInfo = (type ,page ,_id) => {
    return (dispatch, getState) => {
       switch (type){
           case 0:
               return dispatch(getCourseList(page,type))
           case -1:
               return dispatch(getCourseDetail(_id))
           case -2:
               return dispatch(showMoreCourseDetail(false))
           case -3:
               if(_id===0){
                   return dispatch(backTop(0))
               }else {
                   return dispatch(backTop(1))
               }

           default:
               return true
       }
    }
}
