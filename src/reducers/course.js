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
    GET_REAL_VEDIOURL
} from '../actions/actionTypes';



const initState = {
    isLoading: false,
    select:{
        page:1,
        list:[],
        selectListIsNull: false //判断列表长度是否为0
    },
    two4Class:{
        page:1,
        list:[],
        two4ClassListIsNull: false, //判断列表长度是否为0
        isLeftBarShow: false,
        chooseList: [], //已选择的产品
        totalNum: 0,  //选择的总产品个数
        totalPrice: 0, //所选产品的总价格
    },
    courseDetail: {},
    isShowMoreDetail: false,
    isShowBackTop: -1, // -1默认 0-显示 1-隐藏
    times: 0, // 滚动条超过一屏幕时候 滚动次数
    showIOS1: false, //显示隐藏错误提示

    realUrl: ''   //视频真实的url
};

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
                        list: state.select.page<=1 ? state.select.list.concat(action.list) : state.select.list,
                        selectListIsNull: action.list.length===0,
                        page: action.list.length===0 ? state.select.page : action.page+1
                    }
                }
            }else {
                return{
                    ...state,
                    two4Class:{
                        ...state.two4Class,
                        list: state.two4Class.page<=1 ? state.two4Class.list.concat(action.list) : state.two4Class.list,
                        two4ClassListIsNull: action.list.length===0,
                        page: action.list.length===0 ? state.two4Class.page : action.page+1
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
            };
        case GET_REAL_VEDIOURL:
            return{
                ...state,
                realUrl: action.url
            }
        default:
            return state;
    }
}