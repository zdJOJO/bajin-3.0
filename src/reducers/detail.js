/**
 * Created by Administrator on 2017/01/10 0010.
 */
import {
    BEGIN_FETCH,
    FALL_FETCH,
    DONE_GET_DETAIL,
    DONE_GET_ACTSTATU,
    DONE_GET_ACTCOMMENT
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
    actStateStr: ''
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
        default:
            return state;
    }
}