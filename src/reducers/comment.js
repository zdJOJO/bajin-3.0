/**
 * Created by Administrator on 2016/12/23 0023.
 */
import {
    BEGIN_GET_COMMENT,
    DONE_GET_COMMENT ,
    FAIL_GET_COMMENT ,
    CHAGNE_PUBLISH_IMGLIST,
    CHANGE_HEADERSTR,
    CHANGE_COMMENT_VALUE
} from '../actions/actionTypes';

const initState = {
    currentPage: 0,
    list: [],  //评论列表
    pageCount: 0,
    rowCount: 0,
    isLoading: true,
    isListNull: false,  //判断列表长度是否为0
    headerStr: '',
    headerStrLength: 0, 
    commentContent: '',
    listInDetail: [],  // 详情内的评论列表
    isFather: 0, // 回复评论时， 0-表示父级，1-表示子集.
    fatherId: 0, // 点击回复那条评论的id, 不点击为0 （ 如果是子集在上送的时候请添加该字段）
    imgList: [] // 发表评论时的 图片列表
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
                listInDetail: action.isInDetail ? action.data.list.slice(0,2) : [],
                rowCount: action.data.rowCount,
                isLoading: false,
                isListNull: action.isListNull
            }
        case FAIL_GET_COMMENT:
            return{
                ...state,
                isLoading: true
            }
        case CHANGE_HEADERSTR:
            return{
                ...state,
                headerStr: action.str,
                headerStrLength: action.str.length,
                commentContent: action.str,
                isFather: action.isFather,
                fatherId: action.fatherId
            }
        case CHANGE_COMMENT_VALUE:
            if(state.headerStrLength>0){
                return {
                    ...state,
                    commentContent: action.commentValue,
                    isFather: action.commentValue.slice(0,state.headerStrLength) ===  state.headerStr ? action.isFather : 0 ,
                    fatherId: action.commentValue.slice(0,state.headerStrLength) ===  state.headerStr ? action.fatherId : 0
                }
            }else {
                return {
                    ...state,
                    commentContent: action.commentValue,
                    isFather: action.isFather,
                    fatherId: action.fatherId
                }
            }
            break
        case CHAGNE_PUBLISH_IMGLIST:
            return{
                ...state,
                imgList: action.list
            }
        default:
            return state;
    }
}