/**
 * Created by Administrator on 2017/01/10 0010.
 */
import {
    BEGIN_FETCH,
    FALL_FETCH,
    DONE_GET_DETAIL,
    DONE_GET_ACTSTATU,
    DONE_GET_ACTCOMMENT,

    ACT_SHOW_MORE,
    ACT_SHOW_BACK_TOP,
    SHOW_PAY_POPUP
} from '../actions/actionTypes';

const initState = {
    activityInfo:{
        activityPic: '',
        activityTitle: 0,
        activityPrice: 0,
        activityAddress: '',
        startTime: 0,
        endTime: 0,
        peopleNumber: 0,
        applyNumber: 0,
        applyEndTime: 0,
        activityDetail: '',
    },   //活动详情
    actStateStr: '',

    isShowBackTop: -1, // -1默认 0-显示 1-隐藏
    times: 0, // 回到顶部按钮点击次数
    isShowMoreDetail: false,  //是否展示更多
    isShowPayPopup: false  //弹出支付层
}

export default function detailReducer(state=initState, action){
    switch (action.type){
        case BEGIN_FETCH:
            return{

            }
        case FALL_FETCH:
            return{

            }
        case DONE_GET_DETAIL:
            return{
                ...state,
                activityInfo: action.data,
                actStateStr: new Date().getTime() > action.data.applyEndTime*1000 ? '已过期' : '报名'
            }
        case DONE_GET_ACTSTATU:
            return{

            }
        case DONE_GET_ACTCOMMENT:
            return{

            }
        case ACT_SHOW_MORE:
            return{
                ...state,
                isShowMoreDetail: action.isShowMore
            }
        case ACT_SHOW_BACK_TOP:
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