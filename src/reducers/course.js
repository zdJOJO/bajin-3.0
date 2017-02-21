/**
 * Created by Administrator on 2017/02/13 0013.
 */
import {
    BEGIN_FETCH,
    FALL_FETCH,
    DONE_GET_COURSELIST,
    DONE_GET_COURSEDETAIL,
    SHOW_MORE_COURSEDETAIL,
    SHOW_BACK_TOP,
    POP_LEFT_BUYBAR,
    CHOOSE_ITEM,
    INIT_CHOOSEDATA,

    SHOW_PAY_POPUP,
    SHOW_DIALOG,

    POST_CIPHERTEXT
} from '../actions/actionTypes';



const initState = {
    isLoading: false,
    select:{
        page:0,
        list:[]
    },
    two4Class:{
        page:0,
        list:[],
        isLeftBarShow: false,
        chooseList: [], //已选择的产品
        totalNum: 0,  //选择的总产品个数
        totalPrice: 0, //所选产品的总价格
    },
    courseDetail: {},
    isShowMoreDetail: false,
    isShowBackTop: -1, // -1默认 0-显示 1-隐藏
    times: 0, // 回到顶部出现次数
    isShowPayPopup: false,  //显示隐藏支付
    showIOS1: false, //显示隐藏错误提示
    ciphertext: ''  //工行卡支付密文
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
            if(action.typeValue===0){
                return{
                    ...state,
                    select:{
                        ...state.select,
                        list: action.list
                    }
                }
            }else {
                return{
                    ...state,
                    two4Class:{
                        ...state.two4Class,
                        list: action.list
                    }
                }
            }
        case DONE_GET_COURSEDETAIL:
            return{
                ...state,
                courseDetail: action.info
            }
        case SHOW_MORE_COURSEDETAIL:
            return{
                ...state,
                isShowMoreDetail: action.isShow,
                isShowBackTop: -1,
                times: 0
            }
        case SHOW_BACK_TOP:
            return{
                ...state,
                isShowBackTop: action.isBackTop ,
                times: action.isBackTop===0 ? state.times+1 : state.times
            }
        case SHOW_PAY_POPUP:
            return{
                ...state,
                isShowPayPopup: action.isShowPayPopup
            }
        case SHOW_DIALOG:
            return{
                ...state,
                showIOS1: action.isDialogShow
            }
        case POP_LEFT_BUYBAR:
            return{
                ...state,
                two4Class:{
                    ...state.two4Class,
                    list: action.list,
                    isLeftBarShow: action.isPop
                }
            }
        case INIT_CHOOSEDATA:
            return{
                ...state,
                two4Class:{
                    ...state.two4Class,
                    totalNum: action.totalNum,
                    totalPrice: action.totalPrice,
                    chooseList: action.chooseList
                }
            }
        case CHOOSE_ITEM:
            for(let i=0;i<state.two4Class.list.length;i++){
                if(action.id === state.two4Class.list[i].id){
                    state.two4Class.list[i].isChoose = action.isChoose
                }
            }
            return{
                ...state,
                two4Class:{
                    ...state.two4Class,
                    list:  state.two4Class.list,
                    chooseList: action.chooseList,
                    totalNum: action.chooseList.length,
                    totalPrice: action.totalPrice
                }
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