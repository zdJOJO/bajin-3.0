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
    SHOW_FULL_POPUP,
    ADD_COLLECTED, CANCLE_COLLECTED, GET_COllECTIONLIST_SUCCESS
} from '../actions/actionTypes';

const initState = {
    isDialogShow: false,
    isShowPayPopup: false,  //显示隐藏支付
    ciphertext: '',  //工行卡支付密文

    isShowToastLoading: false,
    toastStr: '成功',

    isShowToastSuccess: false,
    swipeIndex: 0,  //首页滑动
    recommendedList: [] ,//  产品内部推荐列表
    isFullPopupShow: false,   //满屏幕的popup
    errorStr: '',

    collectionList: [], //收藏列表 GET_COllECTIONLIST_SUCCESS
    isCollection: false, //物品是否被收藏
    collectId: 0  //收藏id
};

export default function publicReducer(state=initState, action){
    switch (action.type){
        case SHOW_DIALOG:
            return{
                ...state,
                isDialogShow: action.isDialogShow,
                errorStr: action.errorStr || ''
            };
        case SHOW_PAY_POPUP:
            return{
                ...state,
                isShowPayPopup: action.isShowPayPopup
            };
        case GET_CIPHERTEXT_SUCCESS:
            return{
                ...state,
                ciphertext: action.text
            };
        case SHOW_TOAST_LOADING:
            return{
                ...state,
                isShowToastLoading:　 action.isShowToastLoading
            };
        case SHOW_TOAST_SUCCESS:
            return{
                ...state,
                isShowToastSuccess:　 action.isShowToastSuccess,
                toastStr: action.toastStr || state.toastStr
            };
        case CHANGE_SWIPE_INDEX:
            return{
                ...state,
                swipeIndex: action.swipeIndex
            };
        case GET_RECOMMENDED_LIST_SUCCESS:
            return{
                ...state,
                recommendedList:　action.list
            };
        case SHOW_FULL_POPUP:
            return{
                ...state,
                isFullPopupShow:　action.isFullPopupShow
            };
        case ADD_COLLECTED:
            return{
                ...state,
                isCollection: action.isCollection,
                collectId: action.collectId
            };
        case CANCLE_COLLECTED:
            return{
                ...state,
                isCollection: action.isCollection
            };
        case  GET_COllECTIONLIST_SUCCESS:
            return{
                ...state,
                // collectionList: action.page === 1 ? action.list : state.collectionList.concat(action.list)
                collectionList: action.list
            }
        default:
            return state;
    }
}