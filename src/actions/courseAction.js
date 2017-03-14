/**
 * Created by Administrator on 2017/02/13 0013.
 */
import {port} from '../public/index'
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
} from './actionTypes'



//显示更多内容
export const showMoreCourseDetail =(isShow)=>{
    return{
        type: SHOW_MORE_COURSEDETAIL,
        isShow
    }
}

//回到顶部 是否显示
export const backTop =(isBackTop)=>{
    return{
        type: SHOW_BACK_TOP,
        isBackTop
    }
}


//开始发起请求
const beginGet = ()=>{
    return {
        type: BEGIN_FETCH
    }
}

//获取失败
const fallGet = ()=> {
    return {
        type: FALL_FETCH
    }
}

//获取列表成功
const successGetCourseList =(list,typeValue,page)=>{
    return{
        type: DONE_GET_COURSELIST,
        list,
        typeValue,
        page
    }
}

//获取详情信息成功
const successGetCourseDetail =(info)=>{
    return{
        type: DONE_GET_COURSEDETAIL,
        info
    }
}

//弹出 购买
export const pupLeftBuyBar = obj =>{
    let isPop = obj.isPop;
    for (let item of obj.list) {
        item.isShow = obj.isPop
    }
    let list= obj.list;
    return{
        type: POP_LEFT_BUYBAR,
        isPop,
        list
    }
}

// 选择购买的item
const chooseItem = obj =>{
    let chooseList = obj.chooseList;
    let isChoose = obj.isChoose;
    let id = obj.id;
    let totalPrice = 0;
    for(let i=0;i<chooseList.length;i++){
        console.log(chooseList[i].price)
        totalPrice += chooseList[i].price
    }
    return{
        type: CHOOSE_ITEM ,
        chooseList,
        isChoose,
        id,
        totalPrice
    }
}

//初始化选择的item
const initChooseData = (totalPrice,totalNum ,chooseList)=>{
    return {
        type: INIT_CHOOSEDATA ,
        totalPrice,
        totalNum,
        chooseList
    }
}


//获取真是 url
const getRealUrlSuccess = (url, videoStyle)=>{
    return{
        type: GET_REAL_VEDIOURL,
        url,
        videoStyle
    }
}



/************************/

//get 获取列表   24堂课列表： type是1,isFather是0   ； 课程列表： type是0,isFather是1
// type: 0全部 1实修 2视频 3音频
// isFather: 0-单个  1-集合
const getCourseList =(page,type)=>{
    let url = type===1 ?  port + '/card/scmv?currentPage='+page+'&size=10&type='+type+'&isFather=0'
        :  port + '/card/scmv?currentPage='+page+'&size=10&type='+type+'&isFather=1';
    return dispatch =>{
        dispatch(beginGet());
        return fetch(url)
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(data => {
                dispatch(successGetCourseList(data.data.list,type ,page))
            })
            .catch(e =>{
                dispatch(fallGet())
                console.log(e)
            })
    }
};


//get 课程详情 http://121.196.232.233/card/scmv/{id}?
const getCourseDetail = (_id)=>{
    return dispatch =>{
        dispatch(beginGet());
        return fetch( port + '/card/scmv/' + _id )
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(data => {
                dispatch(successGetCourseDetail(data.data))
            })
            .catch(e =>{
                dispatch(fallGet())
                console.log(e)
            })
    }
};



// 点击 勾选之后 chooseList 和 list 的分配
const upDateList = obj =>{
    return dispatch =>{
        if(obj.course.isChoose){
            // chooseList 中删除 取消项
            console.log('删除')
            obj.course.isChoose = false;
            for(let i=0;i<obj.chooseList.length;i++){
                if(obj.course.id === obj.chooseList[i].id){
                    obj.chooseList.splice(i,1)
                }
            }
        }else {
            // chooseList 中增加 勾选项
            console.log('增加')
            obj.course.isChoose = true;
            obj.chooseList.push(obj.course)
        }

        console.log(obj.chooseList)

        dispatch(chooseItem({
            chooseList: obj.chooseList,
            isChoose: obj.course.isChoose,
            id: obj.course.id
        }))
    }
};



//获取 视频真实的url  GET
const getRealUrl  = (key, videoDom)=>{
    return dispatch =>{
        return fetch( port + '/card/scmv/resource?key=' + key )
            .then(res => {
                return res.json()
            })
            .then( data => {
                dispatch(getRealUrlSuccess(data.url));
                videoDom.play();
            })
            .catch(e =>{
                dispatch(fallGet())
                console.log(e)
            })
    }
};


/*
* type :
* 0:  课程全部列表
* 1:  24堂课列表
* -1: 课程详情
* -2: 更新详情是否显示更多
* -3: 回到顶部次数纪录
*
* 当page为-1时，说明当page为没用
* */
export const fetchInfo = (type ,page ,_id) => {
    return (dispatch, getState) => {
       switch (type){
           case 0:
               return dispatch(getCourseList(page,type))
           case 1:
               return dispatch(getCourseList(page,type))
           case -1:
               return dispatch(getCourseDetail(_id))
           case -2:
               return dispatch(showMoreCourseDetail(false))
           case -3:
               if(_id===0){
                   return dispatch(backTop(0))
               }else {
                   return dispatch(backTop(1))
               }
           default:
               return true
       }
    }
}



/*
* obj.type 取值：
* 1 - 显示购买的bar
* 2 - 选择勾选购买的产品
* 3 - 初始化 购买数量和总价格
* 4 - 获取 视频 真是的 url
* */
export const disPatchFn = (obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 1:
                return dispatch(pupLeftBuyBar(obj));
            case 2:
                return dispatch(upDateList(obj));
            case 3:
                let chooseList = [];
                return dispatch(initChooseData(0 ,0,chooseList));
            case 4:
                return dispatch(getRealUrl(obj.key, obj.videoDom));
            default:
                return true
        }
    }
}
