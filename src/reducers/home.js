
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
    contentList: []
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
                contentList: action.list
            }
        }
        default:
            return state;
    }
}