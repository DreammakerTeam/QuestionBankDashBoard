/**
 * Created by lusiwei on 2016/10/29.
 */
require('./styles.css');

import React from 'react'
import { connect } from 'react-redux'
import { store } from '../../stores/index'
import { Tabs, Modal, Input } from 'antd'
import { fetchCreateBigBank, fetchCreateSmallBank, getBigBank, getSmallBank, fetchBigBank, fetchSmallBank, fetchUploadQuestion, setActiveBank, fetchDeleteBank, deleteBigBank, deleteSmallBank } from '../../actions/questions'

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

const Questions = React.createClass({
    handleInputChanged(value) {
        this.newBankName = value;
    },

    //valuesetBankActive(bank) {
    //    store.dispatch(setActiveBank(bank));
    //    store.dispatch(fetchSmallBank(bank._id))
    //        .then(data => {
    //            if (data.error) {
    //                message.error(data.error, 2);
    //                store.dispatch(getSmallBank([]));
    //            } else {
    //                store.dispatch(getSmallBank(data.banks));
    //            }
    //        })
    //},

    //handleAddBank(name, type) {
    //    switch (type) {
    //        case 'big_add':
    //            store.dispatch(fetchCreateBigBank(name))
    //                .then(data => {
    //                    if (data.error) {
    //                        message.error(data.error, 2);
    //                    } else {
    //                        store.dispatch(getBigBank(data.bank))
    //                    }
    //                });
    //            break;
    //        case 'small_add':
    //            store.dispatch(fetchCreateSmallBank(name, this.props.activeBank._id))
    //                .then(data => {
    //                    if (data.error) {
    //                        message.error(data.error, 2);
    //                    } else {
    //                        store.dispatch(getSmallBank(data.bank))
    //                    }
    //                });
    //            break;
    //        default:
    //            break;
    //    }
    //},

    //handleDeleteBankButtonClick(bank) {
    //    store.dispatch(fetchDeleteBank(bank._id))
    //        .then(data => {
    //            if (data.error) {
    //                message.error(data.error, 2)
    //            } else {
    //                let targetAction = bank.type === 0 ? deleteSmallBank : deleteBigBank;
    //                store.dispatch(targetAction(bank));
    //            }
    //        })
    //},

    //getInitialState() {
    ////    //this.add_big_bank_input = <Input className="add-bank-input" placeholder="请输入新版块名"
    ////    //                                 onChange={e => this.handleInputChanged(e.target.value)}/>;
    ////
    ////    //const panes = [{ title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    ////    //    { title: 'Tab 2', content: 'Content of Tab 2', key: '2' }];
    ////    //const panes = this.props.bigBanks.map(bank => {
    ////    //        return ({title: bank.name, conent: 'Content of Tab 1', key: bank._id});
    ////    //
    ////    //return {
    ////    //    activeKey: panes[0].key,
    ////    //    panes
    ////    //};
    //    return {};
    //},

    //onChange(activeKey) {
    //    this.setState({ activeKey });
    //},
    //
    //onEdit(targetKey, action) {
    //    this[action](targetKey);
    //},

    //add() {
    //    //let panes = this.props.bigBanks;
    //    //let activeKey = this.props.bigBanks[this.props.bigBanks.length-1];
    //    //let activeKey = `newTab${this.props.bigBanks.length++}`;
    //    var this_area = this;
    //    confirm({
    //        title: '请输入新版块名',
    //        content: <Input className="add-bank-input" placeholder="请输入新版块名"
    //                        onChange={e => this.handleInputChanged(e.target.value)}/>,
    //        onOk: () => {
    //            handleAddBank(this.newBankName, 'big');
    //            // this.props.bigBanks.push({ title: this.newBankName, content: 'Content of new Tab', key: activeKey });
    //            //this_area.setState({ panes, activeKey });
    //            this.newBankName = '';
    //        },
    //        onCancel: function() {}
    //    });
    //},

    //remove(targetKey) {
    //    let activeKey = this.state.activeKey;
    //    let lastIndex;
    //    this.state.panes.forEach((pane, i) => {
    //        if (pane.key === targetKey) {
    //            lastIndex = i - 1;
    //        }
    //    });
    //    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    //    if (lastIndex >= 0 && activeKey === targetKey) {
    //        activeKey = panes[lastIndex].key;
    //    }
    //    this.setState({ panes, activeKey });
    //},

    componentWillMount() {
        store.dispatch(fetchBigBank())
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                } else {
                    store.dispatch(getBigBank(data.banks));
                }
            })
    },

    render() {
        console.log(this.props.bigBanks);
        return (
            <Tabs
                onChange={this.onChange}
                //activeKey={this.state.activeKey}
                type="editable-card">
                {this.props.bigBanks.map((bank, index) => <TabPane tab={bank.name} key={index}>{bank.name}</TabPane>)}
            </Tabs>
        );
    }
});

function mapStateToProps(state) {
    return {
        bigBanks: state.bigBanks,
        smallBanks: state.smallBanks,
        activeBank: state.activeBank
    }
}

export default connect(mapStateToProps)(Questions);
