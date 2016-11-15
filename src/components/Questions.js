'use strict';

import React from 'react'
import { store } from '../stores/RootStore'
import { connect } from 'react-redux'
import { message, Card, Menu, Row, Col, Input, Button, Upload } from 'antd'
import { fetchCreateBigBank, fetchCreateSmallBank, getBigBank, getSmallBank, fetchBigBank, fetchSmallBank, fetchUploadQuestion, setActiveBank, fetchDeleteBank, deleteBigBank, deleteSmallBank } from '../actions/questions'

class QuestionsComponent extends React.Component {
    setBankActive(bank) {
        store.dispatch(setActiveBank(bank));
        store.dispatch(fetchSmallBank(bank._id))
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                    store.dispatch(getSmallBank([]));
                } else {
                    store.dispatch(getSmallBank(data.banks));
                }
            })
    }
    handleDeleteBankButtonClick(bank) {
        store.dispatch(fetchDeleteBank(bank._id))
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2)
                } else {
                    let targetAction = bank.type === 0 ? deleteSmallBank : deleteBigBank;
                    store.dispatch(targetAction(bank));
                }
            })
    }
    handleAddBankInputEnter(name, type) {
        switch (type) {
            case 'big':
                store.dispatch(fetchCreateBigBank(name))
                    .then(data => {
                        if (data.error) {
                            message.error(data.error, 2);
                        } else {
                            store.dispatch(getBigBank(data.bank))
                        }
                    });
                break;
            case 'small':
                store.dispatch(fetchCreateSmallBank(name, this.props.activeBank._id))
                    .then(data => {
                        if (data.error) {
                            message.error(data.error, 2);
                        } else {
                            store.dispatch(getSmallBank(data.bank))
                        }
                    });
                break;
            default:
                break;
        }
    }
    handleBigBankClick(bank) {
        setActiveBank(bank);
    }
    handleUpload(info, lastId, id) {
        let data = new FormData();
        data.append('file', info.file.originFileObj);
        if (info.file.status !== 'uploading') {
            store.dispatch(fetchUploadQuestion(lastId, id, data))
                .then(data => {
                    if (data.error) {
                        message.error('上传失败', 2);
                        window.console.log(data.error);
                    } else {
                        message.success('上传成功', 2);
                    }
                })
        }
    }
    componentWillMount() {
        store.dispatch(fetchBigBank())
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                } else {
                    store.dispatch(getBigBank(data.banks));
                }
            })
    }
    render() {
        let add_big_bank_input = <Input className="add-bank-input" placeholder="请输入新版块名"
                                    onPressEnter={e => this.handleAddBankInputEnter(e.target.value, 'big')}/>;
        let add_small_bank_input = <Input className="add-bank-input" placeholder="请输入新版块名"
                                          onPressEnter={e => this.handleAddBankInputEnter(e.target.value, 'small')}/>;

        return (
            <Row type="flex" justify="center" align="top" className="height-100">
                <Col span={22} className="height-100">
                    <div className="title-wrapper">
                        <h1 className="page-title">试题管理</h1>
                        <hr/>
                    </div>
                    <div className="content-wrapper">
                        <div className="user-list-wrapper">
                            <div className="bank-wrapper">
                                <Row>
                                    <Col span={12}>
                                        <Card title="大版块" extra={add_big_bank_input}>
                                            <Menu onSelect={({item}) => this.setBankActive(item.props.bank)}>
                                                {this.props.bigBanks.map(bank => {
                                                    return (
                                                        <Menu.Item key={bank._id} bank={bank}>{bank.name}
                                                            <Button type="ghost"
                                                                    className="delete-button button-no-border delete-bank-button"
                                                                    onClick={() => this.handleDeleteBankButtonClick(bank)}>删除</Button> </Menu.Item>
                                                    )
                                                })}
                                            </Menu>
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Card title="子版块" extra={add_small_bank_input}>
                                            <Menu>
                                                {this.props.smallBanks.map(bank => {
                                                    return (
                                                        <Menu.Item key={bank._id} bank={bank}>{`${bank.name} 已有${bank.activeCount}人激活`}
                                                            <Button type="ghost"
                                                                    className="delete-button button-no-border delete-bank-button"
                                                                    onClick={() => this.handleDeleteBankButtonClick(bank)}>删除</Button>
                                                            <Upload name={bank.name} action="#"
                                                                onChange={info => this.handleUpload(info, bank.lastId, bank._id)} className="upload-bank-button">
                                                                <Button type="ghost"
                                                                        className="delete-button button-no-border"
                                                                >上传</Button>
                                                            </Upload>
                                                        </Menu.Item>
                                                    )
                                                })}
                                            </Menu>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        bigBanks: state.bigBanks,
        smallBanks: state.smallBanks,
        activeBank: state.activeBank
    }
}

export default connect(mapStateToProps)(QuestionsComponent);
