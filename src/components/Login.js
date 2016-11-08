/*
* @Author: QBoooogle
* @Date:   2016-11-08 20:20:32
* @Last Modified by:   QBoooogle
* @Last Modified time: 2016-11-08 21:52:27
*/


require('../styles/login.css');

import React from 'react'
import {Input, Card, Button, message} from 'antd'
import {store} from '../stores/RootStore'
import {inputTyping, login, setUser} from '../actions/login'
import {hashHistory} from 'react-router'

export default class LoginComponent extends React.Component {
	handleLoginClicked() {
		let loading = message.loading('loading...', 0);
		let {username, password } = store.getState().inputTyping;
		store.dispatch(login(username, password)).then(data=> {
			loading();

			if(data.error) {
				message.error(data.error, 2);
			} else {
				if (data.user.type !== 1) {
					message.error("没有授权", 2);
				} else {
					store.dispatch(setUser(data.user));
					hashHistory.repalce('home');
				}
			}
		}, ()=> {
			loading();
		});
	}

	handleInputChanged(e) {
		store.dispatch(inputTyping(e.target.name, e.target.value));
	}

	render() {
		const phone_icon = <i className = "iconfont icon-phone"/>;
		const password_icon = <i className = "iconfont icon-password"/>;

		return (
			<div className="page" id="login-page">
			    <Card id="login-box" title="登录管理员">
                    <Input type="text" name="username" ref="username" addonBefore={phone_icon}
                           onChange={this.handleInputChanged} placeholder="请输入手机号码"/>
                    <Input type="password" name="password" ref="password" addonBefore={password_icon}
                           onChange={this.handleInputChanged} placeholder="请输入密码"
                           onPressEnter={this.handleLoginClicked} />
                    <Button id="login-button" type="primary" onClick={this.handleLoginClicked}>登录</Button>
                    <Button id="register-button" type="success" onClick={this.handleLoginClicked}>注册</Button>
                </Card>
            </div>
        );
    }
}

