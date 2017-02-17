/**
 * Created by Administrator on 2017/02/13 0013.
 */
import {
    BEGIN_FETCH,
    FALL_FETCH,
    DONE_GET_COURSELIST,
    DONE_GET_COURSEDETAIL,
    SHOW_MORE_COURSEDETAIL,
    SHOW_BACK_TOP,
    SHOW_PAY_POPUP
} from '../actions/actionTypes';

const initState = {
    isLoading: false,
    select:{
        page:0,
        list:[]
    },
    two4Class:{
        page:0,
        list:[]
    },
    courseDetail: {},
    isShowMoreDetail: false,
    isShowBackTop: -1, // -1默认 0-显示 1-隐藏
    times: 0, // 回到顶部出现次数
    isShowPayPopup: false
}

export default function courseReducer(state=initState, action){
    switch (action.type){
        case BEGIN_FETCH:
            return{
                ...state,
                isLoading: true
            }
        case FALL_FETCH:
            return{
                ...state,
                isLoading: true
            }
        case DONE_GET_COURSELIST:
            return{
                ...state,
                select:{
                    ...state.select,
                    list: action.list
                }
            }
        case DONE_GET_COURSEDETAIL:
            return{
                ...state,
                courseDetail: action.info
            }
        case SHOW_MORE_COURSEDETAIL:
            return{
                ...state,
                isShowMoreDetail: action.isShow,
                isShowBackTop: -1,
                times: 0
            }
        case SHOW_BACK_TOP:
            return{
                ...state,
                isShowBackTop: action.isBackTop ,
                times: action.isBackTop===0 ? state.times+1 : state.times
            }
        case SHOW_PAY_POPUP:
            return{
                ...state,
                isShowPayPopup: action.isShowPayPopup
            }
        default:
            return state;
    }
}