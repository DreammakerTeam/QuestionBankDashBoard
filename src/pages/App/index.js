/**
 * Created by lusiwei on 2016/10/29.
 */
require('./style.css');

import React from 'react';
import { browserHistory } from 'react-router'

import Header from '../../components/Header'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.menus = [{
            name: '用户管理',
            key: 'users',
            default: true
        }, {
            name: '试题管理',
            key: 'questions'
        }];
    }
    render() {
        return (
            <div>
                <Header title="DashBoard" menus={this.menus}
                        onMenuItemSelect={item => this.handleMenuItemSelected(item.key)}/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }

    handleMenuItemSelected(key) {
        browserHistory.push(key);
    }
}
