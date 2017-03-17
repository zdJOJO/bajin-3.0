/**
 * Created by Administrator on 2017/02/22 0022.
 */
/*
* 用来存贮
* 支付相关的数据
* */
import {
    SHOW_DIALOG,
    SHOW_PAY_POPUP ,
    GET_CIPHERTEXT_SUCCESS,
    SHOW_TOAST_LOADING,
    SHOW_TOAST_SUCCESS,
    CHANGE_SWIPE_INDEX,
    GET_RECOMMENDED_LIST_SUCCESS,
    SHOW_FULL_POPUP
} from '../actions/actionTypes';

const initState = {
    isDialogShow: false,
    isShowPayPopup: false,  //显示隐藏支付
    ciphertext: '',  //工行卡支付密文
    isShowToastLoading: false,
    isShowToastSuccess: false,
    swipeIndex: 0,  //首页滑动
    recommendedList: [] ,//  产品内部推荐列表
    isFullPopupShow: false,   //满屏幕的popup
    errorStr: ''
};

export default function publicReducer(state=initState, action){
    switch (action.type){
        case SHOW_DIALOG:
            return{
                ...state,
                isDialogShow: action.isDialogShow,
                errorStr: action.errorStr || ''
            }
        case SHOW_PAY_POPUP:
            return{
                ...state,
                isShowPayPopup: action.isShowPayPopup
            }
        case GET_CIPHERTEXT_SUCCESS:
            return{
                ...state,
                ciphertext: action.text
            }
        case SHOW_TOAST_LOADING:
            return{
                ...state,
                isShowToastLoading:　 action.isShowToastLoading
            }
        case SHOW_TOAST_SUCCESS:
            return{
                ...state,
                isShowToastSuccess:　 action.isShowToastSuccess
            }
        case CHANGE_SWIPE_INDEX:
            return{
                ...state,
                swipeIndex: action.swipeIndex
            }
        case GET_RECOMMENDED_LIST_SUCCESS:
            return{
                ...state,
                recommendedList:　action.list
            }
        case SHOW_FULL_POPUP:
            return{
                ...state,
                isFullPopupShow:　action.isFullPopupShow
            }
        default:
            return state;
    }
}