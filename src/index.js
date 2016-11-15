require('antd/dist/antd.css');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login'
import Home from './components/Home'
import Introduce from './components/Introduce'
import Users from './components/Users'
import Register from './components/Register'
import Questions from './components/Questions'

import { Router, Route, IndexRedirect } from 'react-router'
import { hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './stores/RootStore'
import { message } from 'antd'

Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
};

Array.prototype.indexOf = function (obj) {
    let pos = -1;
    this.forEach(function (e, index) {
        if (e === obj) {
            pos = index;
        }
    });
    return pos;
};

Array.prototype.isArray = true;

function onHomeEnter(nextState, replace) {

    const user = store.getState().setUser.user;

    if (!user || user.type !== 1) {
        message.error('您不是管理员!', 2);
        replace('login');
    }
}

// Render the main component into the dom
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/">
            //     <IndexRedirect to="login" />
            //     <Route path="login" component={Login}/>
            //     <Route path="home" component={Home} onEnter={onHomeEnter}>
            //         <IndexRedirect to="introduce" />
            //         <Route path="introduce" components={ {content: Introduce} }/>
            //         <Route path="users" components = { {content: Users}} />
            //         <Route path="questions" components={ {content: Questions} } />
            //         <Route path="register" components = { {content: Register} } />
            //     </Route>
            // </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
