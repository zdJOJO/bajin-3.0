/**
 * Created by Administrator on 2017/02/13 0013.
 */
import {port} from '../public/index'
import {
    BEGIN_FETCH,
    FALL_FETCH
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


