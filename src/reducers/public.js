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
    POST_CIPHERTEXT
} from '../actions/actionTypes';

const initState = {
    isDialogShow: false,
    isShowPayPopup: false,  //显示隐藏支付
    ciphertext: ''  //工行卡支付密文
};

export default function publicReducer(state=initState, action){
    switch (action.type){
        case SHOW_DIALOG:
            return{
                ...state,
                isDialogShow: action.isDialogShow
            }
        case SHOW_PAY_POPUP:
            return{
                ...state,
                isShowPayPopup: action.isShowPayPopup
            }
        case POST_CIPHERTEXT:
            return{
                ...state,
                ciphertext: action.text
            }
        default:
            return state;
    }
}