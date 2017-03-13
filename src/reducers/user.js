/**
 * Created by Administrator on 2017/03/03 0003.
 */

import {
    GET_USERINFO_SUCCESS, GET_BANKLIST_SUCCESS, GET_MYCOURSELIST_SUCCESS, GET_MYGIFTSLIST_SUCCESS,
    GET_GIFTDETAIL_SUCCESS,
    SET_USERINFO_SUCCESS, SET_HEADPIC_SUCCESS, FEEDBACK_SUCCESS, CAHNGE_POST_IMGLIST,
    SET_FEEDBACK_SHOW
} from '../actions/actionTypes'


const initState = {
    name: '',
    bankCardList: [],  //银行卡列表
    userInfo:{},
    postImgList: [],  //上传用的图片列表
    feedBackShow: false,
    myCourse:{
        voice: [],
        media: [],
        course: []
    },   //我的课程列表
    myGift: [],   //我的礼品中心
    giftDetail: {}  //礼包中心详情
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
            };
        case GET_MYCOURSELIST_SUCCESS:
            return{
                ...state,
                myCourse:{
                    ...state.myCourse,
                    voice: action.listObj.voice,
                    media: action.listObj.media,
                    course: action.listObj.course
                }

            };
        case GET_MYGIFTSLIST_SUCCESS:
            return{
                ...state,
                myGift: action.list
            };
        case GET_GIFTDETAIL_SUCCESS:
            return{
                ...state,
                giftDetail: action.info
            };
        default:
            return state
    }
}