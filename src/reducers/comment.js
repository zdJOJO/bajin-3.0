/**
 * Created by Administrator on 2016/12/23 0023.
 */
import {
    BEGIN_GET_COMMENT,
    DONE_GET_COMMENT ,
    FAIL_GET_COMMENT ,
    PUBLISH_COMMENT,
    CHANGE_PLACEHOLDER
} from '../actions/actionTypes';

const initState = {
    currentPage: 0,
    list: [],
    pageCount: 0,
    rowCount: 0,
    isLoading: true,
    isListNull: false,  //判断列表长度是否为0
    placeholder: '请填写评论'
};

export default function commentReducer(state=initState ,action){
    switch (action.type){
        case BEGIN_GET_COMMENT:
            return{
                ...state,
                isLoading: true
            }
        case DONE_GET_COMMENT:
            return{
                ...state,
                currentPage: action.data.currentPage,
                list: action.data.currentPage===1?action.data.list : state.list.concat(action.data.list),
                rowCount: action.data.rowCount,
                isLoading: false,
                isListNull: action.isListNull
            }
        case FAIL_GET_COMMENT:
            return{
                ...state,
                isLoading: true
            }
        case CHANGE_PLACEHOLDER:
            return{
                ...state,
                placeholder: action.str
            }
        case PUBLISH_COMMENT:
        default:
            return state;
    }
}