'use strict';

import React from 'react'
import $http from '../$http'
import base_config from '../config/base'
import { message } from 'antd';
import { setActiveNum, setRegisterNum } from '../actions/introduce'
import { store } from '../stores/RootStore'
import { connect } from 'react-redux'

class IntroduceComponent extends React.Component {
    componentWillMount() {
        $http.get(`${base_config.host}/users/count`)
            .then(result => {
                    if (result.error) {
                        message.error(result.error, 2);
                    } else {
                        store.dispatch(setRegisterNum(result.count));
                    }
                });

        // $http.get(`${base_config.host}/users/activeCount`)
        //     .then(data => {
        //         if (data.error) {
        //             message.error(data.error, 2);
        //         } else {
        //             store.dispatch(setActiveNum(data.count))
        //         }
        //     })
    }

    render() {
        let { register_num, active_num } = this.props;
        return (
            <div id="introduce-container">
                <div className="introduce-line">已有 <span className="introduce-num">{register_num}</span> 人注册</div>
            </div>
        );
    }
}

IntroduceComponent.propTypes = {
    register_num: React.PropTypes.number.isRequired,
    active_num: React.PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        register_num: state.registerNum,
        active_num: state.activeNum
    }
}

export default connect(mapStateToProps)(IntroduceComponent);
