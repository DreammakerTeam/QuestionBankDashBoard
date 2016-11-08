/**
 * Created by lusiwei on 2016/10/29.
 */

import React from 'react';
import { Menu } from 'antd';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            header: {
                height: '4rem',
                width: '100%',
                background: 'white',
                boxShadow: '0 0 10px gray',
                position: 'fixed',
                left: '0',
                top: '0'
            },
            title: {
                height: '4rem',
                width: '5rem',
                lineHeight: '4rem',
                fontSize: '1rem',
                margin: '0',
                marginLeft: '.8rem',
                float: 'left'
            },
            menu: {
                height: '4rem',
                lineHeight: '4rem',
                float: 'right'
            }
        }
        this.defaultSelectedKeys = (menus => {
            let selected = [];
            menus.forEach(menu => {
                if (menu.default) selected.push(menu.key);
            });
            return selected;
        })(this.props.menus);
    }
    render() {
        return (
            <header style={this.styles.header}>
                <h1 style={this.styles.title}>{this.props.title}</h1>
                <Menu mode="horizontal" style={this.styles.menu}
                      defaultSelectedKeys={this.defaultSelectedKeys}
                      onSelect={this.props.onMenuItemSelect}>
                    {this.props.menus.map(menu => (
                        <Menu.Item key={menu.key}>{menu.name}</Menu.Item>
                    ))}
                </Menu>
            </header>
        )
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string.isRequired,
            menus: React.PropTypes.array.isRequired,
            onMenuItemSelect: React.PropTypes.func
        }
    }
}
