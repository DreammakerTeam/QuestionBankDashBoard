'use strict';
import React from 'react';
import { store } from '../stores/RootStore';
import { connect } from 'react-redux';
import { Cascader } from 'antd';
import { Select, message } from 'antd';
import { getSmallBank, getBigBank, fetchBigBank, fetchSmallBank } from '../actions/questions';
import { changeTargetBankId } from '../actions/bankSelect';

class BankSelect extends React.Component {
    handleBigBankSelectChange(bank_id) {
        store.dispatch(fetchSmallBank(bank_id))
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                    store.dispatch(getSmallBank([]));
                } else {
                    store.dispatch(changeTargetBankId(bank_id, 'big'));
                    store.dispatch(changeTargetBankId(data.banks[0]._id, 'small'));
                    store.dispatch(getSmallBank(data.banks));
                }
            })
    }

    handleSmallBankSelectChange(bank_id) {
        store.dispatch(changeTargetBankId(bank_id, 'small'));
    }

    componentWillMount() {
        store.dispatch(fetchBigBank())
            .then(data => {
                if (data.error) {
                    message.error(data.error, 2);
                    store.dispatch(getBigBank([]));
                } else {
                    store.dispatch(getBigBank(data.banks));
                    store.dispatch(changeTargetBankId(data.banks[0]._id, 'big'));
                    store.dispatch(fetchSmallBank(data.banks[0]._id))
                        .then(data => {
                            if (data.error) message.error(data.error, 2);
                            else {
                                store.dispatch(getSmallBank(data.banks));
                                store.dispatch(changeTargetBankId(data.banks[0]._id, 'small'));
                            }
                        })
                }
                console.log(data.banks[0]._id);
            })
    }
    render() {
        return (
        <span>
            <Select defaultValue="小版块" value={this.props.targetSmallBankId} style={{ width: 120 }} onChange={e => this.handleSmallBankSelectChange(e)}>
                {this.props.smallBanks.map(bank => <Select.Option value={bank._id} key={bank._id}>{bank.name}</Select.Option>)}
            </Select>
            <Select defaultValue="大版块" value={this.props.targetBigBankId} style={{ width: 120 }} onChange={e => this.handleBigBankSelectChange(e)}>
                {this.props.bigBanks.map(bank => <Select.Option value={bank._id} key={bank._id}>{bank.name}</Select.Option>)}
            </Select>
        </span>
    }
}

function mapStateToProps(state) {
    return {
        smallBanks: state.smallBanks,
        bigBanks: state.bigBanks,
        targetBigBankId: state.targetBigBankId,
        targetSmallBankId: state.targetSmallBankId
    }
}

export default connect(mapStateToProps)(BankSelect);