/**
 * Created by Administrator on 2017/02/08 0008.
 */
import {CHANGE_MENU_TAB} from '../actions/actionTypes';

const initState = {
    index: 0
}

export default function menuReducer(state=initState, action){
    switch (action.type){
        case CHANGE_MENU_TAB :
            return {
                ...state,
                index: action.index
            }
        default:
            return state;
    }
}