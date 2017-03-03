
/**
 * Created by Administrator on 2017/02/27 0027.
 */
import {
    GET_BANNER_SUCCESS,
    GET_ICBC_BTN_SUCCESS,
    GET_HOME_CONTENTLIST_SUCCESS
} from '../actions/actionTypes'

const initState = {
    bannerList: [],
    icbcBtnList: [],
    contentList: []
};

export default function homeReducer(state=initState, action){
    switch (action.type){
        case GET_BANNER_SUCCESS:
            return{
                ...state,
                bannerList: action.list
            }
        case GET_ICBC_BTN_SUCCESS:
            return{
                ...state,
                icbcBtnList: action.list
            }
        case GET_HOME_CONTENTLIST_SUCCESS:{
            return{
                ...state,
                contentList: action.list
            }
        }
        default:
            return state;
    }
}