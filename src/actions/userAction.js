/**
 * Created by Administrator on 2017/03/03 0003.
 */

import cookie from 'react-cookie'
import {port, isTokenExpired} from '../public/index'
import {
    GET_USERINFO_SUCCESS, GET_BANKLIST_SUCCESS, 
    SET_USERINFO_SUCCESS, FEEDBACK_SUCCESS, CAHNGE_FEEDBACK_IMGLIST
} from './actionTypes';
import { showDialog, showToastLoading, showToastSuccess } from '../actions/publicAction'


// 获取 用户个人信息
const getUserInfoSuccess = (info)=>{
    return{
        type: GET_USERINFO_SUCCESS,
        info
    }
};

// 成功获取银行卡列表
const getBankListSuccess = list =>{
    return{
        type: GET_BANKLIST_SUCCESS,
        list
    }
};


// 个人信息 设置成功
const setUserInfoSuccess = info => {
    return{
        type: SET_USERINFO_SUCCESS,
        info
    }
};

//反馈信息成功
const feedBackSuccess = (list) =>{
    return{
        type: FEEDBACK_SUCCESS,
        list
    }
}

const changeFeedBackImgList = (list, postImgList) =>{
    return{
        type: CAHNGE_FEEDBACK_IMGLIST,
        list,
        postImgList
    }
}

/******************************/

//获取用户个人信息 GET
const getUserInfo =()=>{
    let url = port + '/card/user?token=' + cookie.load('token');
    return dispatch =>{
        return fetch( url )
            .then( res=>{
                return res.json()
            })
            .then( json=>{
                isTokenExpired(json.code, function () {
                    dispatch( getUserInfoSuccess(json))
                })
            })
            .catch( e=>{
                console.log(e)
            })
    }
};


// 获取银行卡列表  GET
const getBankList =()=>{
    return dispatch =>{
        return fetch( port + '/card/card?token=' + cookie.load('token'))
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                isTokenExpired(json.code,function () {
                    dispatch(getBankListSuccess(json.list))
                });
            })
            .catch( e =>{
                console.log(e)
            })
    }
};


//设置用户信息 PUT
const setUserInfo =(obj)=>{
    let data = obj.data;
    return dispatch =>{
        dispatch(showToastLoading(true));
        return fetch( port + '/card/user?token=' + cookie.load('token') ,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res =>{
            return res.json();
        }).then( json =>{
            isTokenExpired(json.code,function () {
                if(json.code === '202'){
                    dispatch(setUserInfoSuccess(obj.data));

                    dispatch(showDialog(false));
                    dispatch(showToastLoading(false));
                    dispatch(showToastSuccess(true));
                    setTimeout(()=>{
                        dispatch(showToastSuccess(false));
                    },1000)
                }
            });
        }).catch(e =>{
            console.log(e)
        })
    }
}


//意见反馈列表上传 POST
const feedBackPost = (obj)=>{
    return dispatch =>{
        return fetch( port + '/card/feedback' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then( res =>{
            return res.json();
        }).then( json =>{
            if(json.code === '201'){
                dispatch(feedBackSuccess());
            }
        }).catch(e =>{
            console.log(e)
        })
    }
}

//图片上传
const upImg = (obj)=>{

    console.log(obj)

    return dispatch=>{
        if(!obj.feedbackDetail){
            return
        }
        dispatch(showToastLoading(true));
        return fetch( port+"/card/file/base64.method?fileName=" + Math.floor(Math.random()*1000000)+".png" ,{
            method: 'POST',
            body: obj.imgBase
        }).then( res=>{
            return res.json();
        }).then( json =>{
            console.log(json)
            obj.feedBackImgList.push({url: json.url});
            obj.postImgList.push({pic: json.url});
            dispatch(feedBackPost({
                feedbackDetail: obj.feedbackDetail,
                imgList: obj.postImgList
            }));
            dispatch(changeFeedBackImgList(obj.feedBackImgList, obj.postImgList))
        }).catch(e=>{
            console.log(e)
        })
    }
};


/*
*  type:
*  1 -  获取用户信息
*  2 - 获取银行卡列表
*  3 - 设置更新用户信息
*  4 -  提交反馈意见
*  5 - 图片上传
* */
export const dispatchFetchData = (obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 1:
                return dispatch(getUserInfo(obj));
                return
            case 2:
                return dispatch(getBankList(obj));
            case 3:
                return dispatch(setUserInfo(obj));
            case 5:
                return dispatch(upImg(obj));
            default:
                return false
        }
    }
}