/**
 * Created by Administrator on 2017/01/12 0012.
 */
import {
    BEGIN_FETCH,
    FALL_FETCH,
    SUCCESS_LOGIN,
    SUCCESS_IMG_UPLOAD,
    SHOW_SUCCESS,
    SHOW_ERROR,
    CHANGE_TAP,
    COUNT_DOWN,
    SET_INTERESTING_LIST
} from '../actions/actionTypes'

/*
* tab 取值:
* 登录页-login ；忘记密码验证码获取页-forget ； 重置密码页-reset ；
* 注册页-signUp ； 注册信息填写页-setInfo ；兴趣选择页面-interest
* */
const initState = {
    loginType: 'login', //用于判断 注册和登录 的接口
    tab: 'login',  //用于判断  登录页面的切换
    userInfo: {},
    isError: false, //判断有错误
    errorStr: '', // 错误信息
    isSuccessful: false, //是否注册成功
    successStr: '', //成功信息
    countDownNum: '获取验证码',
    disable: false,   //获取验证码 是否可以点击  true-可以  false-不可以
    birthDay: '', //生日
    interestingList: []  //兴趣数组
}

export default function loginReducer (state=initState ,action) {
    switch (action.type){
        case SET_INTERESTING_LIST:
            return{
                ...state,
                interestingList: action.list
            }
        case COUNT_DOWN :
            return{
                ...state,
                countDownNum: action.countDownNum,
                disable: action.disable
            }
        case CHANGE_TAP:
            return{
                ...state,
                tab: action.tab
            }
        case SHOW_SUCCESS:
            return{
                ...state,
                successStr: action.successStr,
                isSuccessful: action.isSuccessful
            }
        case SHOW_ERROR:
            return{
                ...state,
                errorStr: action.errorStr,
                isError: action.isError
            }
        case BEGIN_FETCH:
            return{
                ...state,
            }
        case FALL_FETCH:
            return{
                ...state,
                errorStr: action.errorStr,
                isError: action.isError
            }
        case SUCCESS_LOGIN:
            return{
                ...state,
                userInfo: {
                    userName: action.userInfo.userName || '',
                    gender: action.userInfo.gender || '',
                    birthDay: action.userInfo.birthDay || ''
                }
            }
        case SUCCESS_IMG_UPLOAD:
            return{
                ...state,
                userInfo: {
                    headPic: action.headPic
                }
            }
        default:
            return state;
    }
}