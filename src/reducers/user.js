/**
 * Created by Administrator on 2017/03/03 0003.
 */

import {
    GET_USERINFO_SUCCESS, GET_BANKLIST_SUCCESS, SET_USERINFO_SUCCESS,
    SET_HEADPIC_SUCCESS
} from '../actions/actionTypes'


const initState = {
    name: '',
    bankCardList: [],
    userInfo:{}
}

export default function userReducer (state=initState, action) {
    switch (action.type){
        case GET_USERINFO_SUCCESS:
            return{
                ...state,
                userInfo: action.info
            };
        case GET_BANKLIST_SUCCESS:
            return{
                ...state,
                bankCardList: action.list
            };
        case SET_USERINFO_SUCCESS:
            return{
                ...state,
                userInfo: {
                    ...state.userInfo,
                    gender: action.info.gender,
                    headPic:  action.info.headPic,
                    userName: action.info.userName
                }
            };
        case SET_HEADPIC_SUCCESS:
            return{
                ...state,
                userInfo: {
                    ...state,
                    headPic: action.pic
                }
            };
        default:
            return state
    }
}