
/**
 * Created by Administrator on 2017/02/27 0027.
 */
import {
    GET_BANNER_SUCCESS,
    GET_ICBC_BTN_SUCCESS
} from '../actions/actionTypes'

const initState = {
    bannerList: [],
    icbcBtnList: []
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
        default:
            return state;
    }
}