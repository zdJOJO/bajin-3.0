/**
 * Created by Administrator on 2017/02/13 0013.
 */
import {
    BEGIN_FETCH,
    FALL_FETCH
} from '../actions/actionTypes';

const initState = {
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
        default:
            return state;
    }
}