/**
 * Created by Administrator on 2017/02/21 0021.
 */
import {
    SHOW_SUCCESS,
    SHOW_ERROR,
    SHOW_PAY_POPUP,
    SHOW_DIALOG
} from './actionTypes';


//弹出支付层
export const showPayPopup =(isShowPayPopup)=>{
    return{
        type: SHOW_PAY_POPUP,
        isShowPayPopup
    }
}


//显示错误提示
export const showDialog = (isDialogShow)=>{
    return{
        type: SHOW_DIALOG,
        isDialogShow
    }
}