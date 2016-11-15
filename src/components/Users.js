'use strict';

import React from 'react'
import { store } from '../stores/RootStore'
import { Button, Input, message, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { fetchUsers, getUsers, activeUser, userFilter, fetchPageCount, setPageCount, userActived, fetchUserByUsername, setPage, fetchRemoveUser, userRemoved } from '../actions/users'
import { fetchSmallBank, getSmallBank } from '../actions/questions'
import { changeTargetBankId } from '../actions/bankSelect'
import BankSelect from './BankSelect'

class UsersComponent extends React.Component {
    isUserValidate(user, validate) {
        return user.type === 1 || new Date(validate.validateTo) > Date.now();
    }

    goNewPage(new_page) {
        store.dispatch(fetchUsers(new_page))
            .then(data => {
                if (data.error) {
                    message.error(data.msg, 2);
                } else {
                    store.dispatch(setPage(new_page));
                    store.dispatch(getUsers(data.users));
                }
            })
    }

    handleBigBankSelectChange(bank_id) {
        store.dispatch(fetchSmallBank(bank_id))
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                    store.dispatch(getSmallBank([]));
                } else {
                    store.dispatch(changeTargetBankId(bank_id, 'big'));
                    store.dispatch(getSmallBank(data.banks));
                }
            })
    }

    handleSmallBankSelectChange(bank_id) {
        store.dispatch(changeTargetBankId(bank_id, 'small'));
    }

    componentWillMount() {
        this.goNewPage(this.props.page);

        store.dispatch(fetchPageCount())
            .then(data => {
                if (data.error) {
                    message.error(data.msg, 2);
                } else {
                    store.dispatch(setPageCount(data.page));
                }
            })
    }

    handleActiveUserButtonClicked(user) {
        store.dispatch(activeUser(user, this.props.targetSmallBankId))
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                } else {
                    store.dispatch(fetchUserByUsername(user.username))
                        .then(data => {
                            if (data.error) {
                                message.error(data.error, 2);
                            } else {
                                store.dispatch(userActived(data.user));
                            }
                        });
                }
            })
    }

    handleFilterInputOnEnter(username) {
        store.dispatch(fetchUserByUsername(username))
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                } else {
                    store.dispatch(userFilter(data.user));
                    let input_node = findDOMNode(this.refs.searchInput.refs.input);
                    input_node.value = '';
                    input_node.blur();
                }
            })
    }

    handleChangePageButtonClicked(type) {
        let new_page = this.props.page;
        switch (type) {
            case 'last':
                --new_page;
                break;
            case 'next':
                ++new_page;
                break;
            default:
                break;
        }
        this.goNewPage(parseInt(new_page) || 1);
    }

    handlePageCounterChanged(new_page) {
        store.dispatch(setPage(new_page));
    }

    handlePageCounterOnEnter() {
        this.goNewPage(this.props.page);
        findDOMNode(this.refs.pageCounter.refs.input).blur()
    }

    handleRemoveUserButtonClicked(user) {
        store.dispatch(fetchRemoveUser(user))
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                } else {
                    store.dispatch(userRemoved(user));
                    if (this.props.users.length === 0) this.goNewPage(this.props.page);
                }
            });
    }

    render() {
        let { page, pageCount } = this.props;
        return (
            <Row type="flex" justify="center" align="top" className="height-100">
                <Col span={22} className="height-100">
                    <div className="title-wrapper">
                        <h1 className="page-title">用户列表</h1>
                        <span className="page-extra search-box">
                            <Input type="text" placeholder="手机号码" ref="searchInput"
                                   onPressEnter={e => this.handleFilterInputOnEnter(e.target.value)}/>
                            <BankSelect/>
                        </span>
                        <hr/>
                    </div>
                    <div className="content-wrapper">
                        <div className="user-list-wrapper">
                            <ul id="user-list">
                                {this.props.users.map(user => {
                                    return <li key={user._id}>
                                        <span className="username">{user.username}</span>
                                        <span className="pxjg"
                                              style={{display: user.pxjg && user.pxjg !== '' ?
                                              'inline' : 'none'}}>在{user.pxjg}培训</span>
                                        <Button type="ghost" className="delete-button button-no-border"
                                                onClick={() => this.handleRemoveUserButtonClicked(user)}>删除</Button>
                                        {
                                            (() => {
                                                let active_button = <Button type="ghost"
                                                                           className="active-button button-no-border"
                                                                           onClick={() => this.handleActiveUserButtonClicked(user)}>激活</Button>
                                                if (user.validate) {
                                                    let result;
                                                    for (let item of user.validate) {
                                                        if (item.bank &&
                                                            (item.bank._id === this.props.targetSmallBankId)) {
                                                            result = item;
                                                            break;
                                                        }
                                                    }
                                                    if (result) return <span
                                                        className="dead-line"
                                                        style={{display: this.isUserValidate(user, result) ?
                                            'inline' : 'none'}}>
                                            有效期至 {new Date(result.validateTo).format('yyyy-MM-dd hh:mm:ss')}</span>
                                                    else return active_button
                                                } else {
                                                    return active_button
                                                }
                                            })()
                                        }

                                    </li>;
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="tool-bar">
                        <div id="buttons">
                            <Button type="ghost" className="button-no-border"
                                    style={{display: page === 1 ? 'none' : 'inline'}}
                                    onClick={() => this.handleChangePageButtonClicked('last')}>上一页</Button>
                            <Input type="text" className="page-counter" value={page} ref="pageCounter"
                                   onChange={e => this.handlePageCounterChanged(e.target.value)}
                                   onPressEnter={() => this.handlePageCounterOnEnter()}/>
                            <Button type="ghost" className="button-no-border"
                                    style={{display: page === pageCount ? 'none' : 'inline'}}
                                    onClick={() => this.handleChangePageButtonClicked('next')}>下一页</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

UsersComponent.propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.shape({
        _id: React.PropTypes.string.isRequired,
        username: React.PropTypes.string.isRequired
    }))
};

function mapStateToProps(state) {
    return {
        page: state.page,
        pageCount: state.pageCount,
        users: state.users,
        bigBanks: state.bigBanks,
        smallBanks: state.smallBanks,
        targetBigBankId: state.targetBigBankId,
        targetSmallBankId: state.targetSmallBankId
    }
}

export default connect(mapStateToProps)(UsersComponent);
