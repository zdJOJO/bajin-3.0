
/**
 * Created by Administrator on 2017/02/27 0027.
 */
import {
    GET_BANNER_SUCCESS,
    GET_ICBC_BTN_SUCCESS,
    GET_HOME_CONTENTLIST_SUCCESS
} from '../actions/actionTypes'

//假数据
const firstList = [
    {
        "createTime": 1487582638,
        "id": 1,
        "isDelete": 2,
        "pic": "http://card2016.oss-cn-hangzhou.aliyuncs.com/942209891cb84c5b6296e4fe823490ef.jpg",
        "rank": 1,
        "title": "我是第一个假数据",
        "type": 1,
        "updateTime": 1487582754,
        "url": ""
    },
    {
        "createTime": 1487582638,
        "id": 2,
        "isDelete": 2,
        "pic": "http://card2016.oss-cn-hangzhou.aliyuncs.com/ff70f52a6d6f37120f62e9adc5084a03.png",
        "rank": 2,
        "title": "假数据我是第一个",
        "type": 1,
        "updateTime": 1487582714,
        "url": ""
    },
    {
        "createTime": 1487582638,
        "id": 2,
        "isDelete": 2,
        "pic": "http://card2016.oss-cn-hangzhou.aliyuncs.com/ff70f52a6d6f37120f62e9adc5084a03.png",
        "rank": 2,
        "title": "假数据我是第一个",
        "type": 1,
        "updateTime": 1487582714,
        "url": ""
    },
    {
        "createTime": 1487582638,
        "id": 2,
        "isDelete": 2,
        "pic": "http://card2016.oss-cn-hangzhou.aliyuncs.com/ff70f52a6d6f37120f62e9adc5084a03.png",
        "rank": 2,
        "title": "假数据我是第一个",
        "type": 1,
        "updateTime": 1487582714,
        "url": ""
    },{
        "createTime": 1487582638,
        "id": 2,
        "isDelete": 2,
        "pic": "http://card2016.oss-cn-hangzhou.aliyuncs.com/ff70f52a6d6f37120f62e9adc5084a03.png",
        "rank": 2,
        "title": "假数据我是第一个",
        "type": 1,
        "updateTime": 1487582714,
        "url": ""
    },{
        "createTime": 1487582638,
        "id": 2,
        "isDelete": 2,
        "pic": "http://card2016.oss-cn-hangzhou.aliyuncs.com/ff70f52a6d6f37120f62e9adc5084a03.png",
        "rank": 2,
        "title": "假数据我是第一个",
        "type": 1,
        "updateTime": 1487582714,
        "url": ""
    },{
        "createTime": 1487582638,
        "id": 2,
        "isDelete": 2,
        "pic": "http://card2016.oss-cn-hangzhou.aliyuncs.com/ff70f52a6d6f37120f62e9adc5084a03.png",
        "rank": 2,
        "title": "假数据我是第一个",
        "type": 1,
        "updateTime": 1487582714,
        "url": ""
    }
]

const initState = {
    bannerList: [],
    icbcBtnList: [],
    firstList: firstList,   //首页内容第一个列表
    secondList: [], //首页内容第二个列表
    thirdList: []  //首页内容第三个列表
};

export default function homeReducer(state=initState, action){
    switch (action.type){
        case GET_BANNER_SUCCESS:
            return{
                ...state,
                bannerList: action.list
            }
        case GET_ICBC_BTN_SUCCESS:
            return{
                ...state,
                icbcBtnList: action.list
            }
        case GET_HOME_CONTENTLIST_SUCCESS:{
            return{
                ...state,
                firstList: state.firstList.concat(action.firstList),
                secondList: state.secondList.concat(action.secondList),
                thirdList: state.thirdList.concat(action.thirdList)
            }
        }
        default:
            return state;
    }
}