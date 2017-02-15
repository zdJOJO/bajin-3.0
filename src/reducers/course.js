/**
 * Created by Administrator on 2017/02/13 0013.
 */
import {
    BEGIN_FETCH,
    FALL_FETCH,
    DONE_GET_COURSELIST
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
    }
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
        default:
            return state;
    }
}