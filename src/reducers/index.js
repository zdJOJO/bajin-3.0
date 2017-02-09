/**
 * Created by Administrator on 2016/12/29 0029.
 */

import { combineReducers } from 'redux'; // 利用combineReducers 合并reducers

import menuReducer from './menu'
import commentReducer from './comment'
import activityReducer from './activity'
import detailReducer from './detail'
import loginReducer from './login'

export default combineReducers({
    menuReducer,
    commentReducer,
    activityReducer,
    detailReducer,
    loginReducer
})