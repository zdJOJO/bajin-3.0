/**
 * Created by Administrator on 2017/03/03 0003.
 */

import {
    GET_BANKLIST_SUCCESS
} from '../actions/actionTypes'


const initState = {
    name: '',
    bankCardList: []
}

export default function userReducer (state=initState, action) {
    switch (action.type){
        case GET_BANKLIST_SUCCESS:
            return{
                ...state,
                bankCardList: action.list
            }
        default:
            return state
    }
}