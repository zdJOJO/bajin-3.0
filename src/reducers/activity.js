/**
 * Created by Administrator on 2017/01/09 0009.
 */
import {
    BEGIN_FETCH,
    FALL_FETCH,
    DONE_GET_ActList,
    POPUP,
    SUBMIT_ACTINFO_SUCCESS,
    SHOW_DIALOG,
    GET_USER_JOINACT_STATUS
} from '../actions/actionTypes';

const initState = {
    initiateAct:{
        popupIsShow: false,  //popup是否显示
        isDialogShow: false,  //提示 是否显示
        showToast: false  //创建成功显示
    },
    activity: {
        startPage: 1,
        list: [],
        pageCount: 0,
        isLoading: true,
        isListNull: false,  //判断每次请求的data列表长度是否为0
    },
    userActStatus: 1   // 用户活动状态
};

export default function activityReducer(state=initState, action){
    switch (action.type){
        case BEGIN_FETCH:
            return{
                ...state,
                isLoading: true
            }
        case DONE_GET_ActList:
            return{
                ...state,
                activity:{
                    startPage: action.data.currentPage,
                    list: action.isRefresh ? action.data.list : state.activity.list.concat(action.data.list),
                    rowCount: action.data.rowCount,
                    isLoading: false,
                    isListNull: action.isRefresh ? false : (action.data.list.length===0)
                }
            }
        case FALL_FETCH:
            return{
                ...state,
                isLoading: true
            }
        case POPUP:
            return{
                ...state,
                initiateAct:{
                    ...state.initiateAct,
                    popupIsShow: action.popupIsShow
                }
            }
        case SHOW_DIALOG:
            return{
                ...state,
                initiateAct:{
                    ...state.initiateAct,
                    isDialogShow: action.isDialogShow
                }
            }
        case SUBMIT_ACTINFO_SUCCESS:
            return{
                ...state,
                initiateAct:{
                    ...state.initiateAct,
                    showToast: action.showToast
                }
            }
        case GET_USER_JOINACT_STATUS:
            return{
                ...state,
                userActStatus: action.status
            }
        default:
            return state;
    }
}