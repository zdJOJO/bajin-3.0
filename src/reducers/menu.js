/**
 * Created by Administrator on 2017/02/08 0008.
 */
import {
    CHANGE_MENU_TAB,
    CHANGE_SUB_NAV
} from '../actions/actionTypes';

const initState = {
    index: 0,
    courseNav:{
        index: 0
    }
}

export default function menuReducer(state=initState, action){
    switch (action.type){
        case CHANGE_MENU_TAB :
            return {
                ...state,
                index: action.index,
                courseNav: {
                    ...state.courseNav,
                    index: 0
                }
            }
        case CHANGE_SUB_NAV :
            if(action.typeStr==='course'){
                return {
                    ...state,
                    courseNav: {
                        ...state.courseNav,
                        index: action.index
                    }
                }
            }
            break
        default:
            return state;
    }
}