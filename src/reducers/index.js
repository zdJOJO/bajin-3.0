/**
 * Created by Administrator on 2016/12/29 0029.
 */

import { combineReducers } from 'redux'; // 利用combineReducers 合并reducers

import publicReducer from './public'
import menuReducer from './menu'
import commentReducer from './comment'
import activityReducer from './activity'
import courseReducer from './course'
import detailReducer from './detail'
import loginReducer from './login'

export default combineReducers({
    publicReducer,
    menuReducer,
    commentReducer,
    activityReducer,
    courseReducer,
    detailReducer,
    loginReducer
})