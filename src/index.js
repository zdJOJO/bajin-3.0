import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // 利用Provider可以使我们的 store 能为下面的组件所用
import { Router, hashHistory } from 'react-router';

import './index.css';

import finalCreateStore from './store/configureStore';  //引入store配置
import reducer from './reducers/index'; // 引入reducers集合
import {routeConfig} from './router/index'  // 引入 路由

// 给增强后的store传入reducer
const store = finalCreateStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}  routes={routeConfig} />
    </Provider>,
    document.getElementById('root')
);
