/**
 * Created by Administrator on 2016/12/23 0023.
 */
import thunk from 'redux-thunk' // redux-thunk 支持 dispatch function，并且可以异步调用它
import createLogger from 'redux-logger' // 利用redux-logger打印日志
import { createStore, applyMiddleware, compose } from 'redux' // 引入redux createStore、中间件及compose

import { dev } from '../public/index';

// 调用日志打印方法
const loggerMiddleware = createLogger();

// 创建一个中间件集合
const middleware = dev ? [thunk] : [thunk, loggerMiddleware];

// 利用compose增强store，这个 store 与 applyMiddleware
const finalCreateStore = compose(
    applyMiddleware(...middleware),
)(createStore)

export default finalCreateStore;