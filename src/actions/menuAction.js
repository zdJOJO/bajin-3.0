/**
 * Created by Administrator on 2017/02/08 0008.
 */
import {
    CHANGE_MENU_TAB,
    CHANGE_SUB_NAV
} from './actionTypes';

export const handleChangeTab = index => {
    return {
        type: CHANGE_MENU_TAB,
        index
    }
};

export const changeSub =(typeStr,index)=>{
    return {
        type: CHANGE_SUB_NAV,
        typeStr,
        index
    }
};