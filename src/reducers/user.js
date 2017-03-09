/**
 * Created by Administrator on 2017/03/03 0003.
 */

import {
    GET_USERINFO_SUCCESS, GET_BANKLIST_SUCCESS, SET_USERINFO_SUCCESS,
    SET_HEADPIC_SUCCESS, FEEDBACK_SUCCESS, CAHNGE_POST_IMGLIST,
    SET_FEEDBACK_SHOW
} from '../actions/actionTypes'


const initState = {
    name: '',
    bankCardList: [],
    userInfo:{},
    postImgList: [],  //上传用的图片列表
    feedBackShow: false
};

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
        case FEEDBACK_SUCCESS:
            return{
                ...state,
                feedBackShow: false
            }
        case CAHNGE_POST_IMGLIST:
            return{
                ...state,
                postImgList: action.list,
            };
        case SET_FEEDBACK_SHOW:
            return{
                ...state,
                feedBackShow: action.feedBackShow
            }
        default:
            return state
    }
}