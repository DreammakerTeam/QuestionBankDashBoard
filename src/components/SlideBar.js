'use strict';

require('../styles/slideBar.css');

import React from 'react'
import { Link } from 'react-router'
import { Menu, Row, Col } from 'antd'

export default class SlideBarComponent extends React.Component {
    render() {
        return (
            <div id="slide-bar">
                <Row className="height-100" justify="center" align="middle" type="flex">
                    <Col span={24}>
                        <Menu defaultSelectedKeys={['introduce']}>
                            <Menu.Item key="introduce"><Link to="/home/introduce">资格证考试</Link></Menu.Item>
                            <Menu.Item key="users"><Link to="/home/users"><i className="iconfont icon-user" /> 用户列表</Link></Menu.Item>
                            <Menu.Item key="questions"><Link to="/home/questions"><i className="iconfont icon-question" /> 试题管理</Link></Menu.Item>
                            <Menu.Item key="register"><Link to="/home/register"><i className="iconfont icon-clientregister" /> 批量注册</Link></Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}
