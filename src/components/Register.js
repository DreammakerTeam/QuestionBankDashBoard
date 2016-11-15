'use strict';
import React from 'react'
import ReactDOM from 'react-dom';
import { store } from '../stores/RootStore';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import BankSelect from './BankSelect'
import { addRegisteringUser, usernameChanging, removeRegisteringUser, fetchMulRegister } from '../actions/register';
import { Row, Col, Input, Button, message } from 'antd'

class Comment extends React.Component {
    render(){
      	return (
            <div>
                <div className="comment-bigBlock">
                  {this.props.bigBlock}
                </div>
                <div className="comment-smallBlock">
                  - {this.props.smallBlock}
                </div>
                <div className="comment-instruction">
                  - {this.props.instruction}
                </div>
                <div className="comment-password">
                  - {this.props.password}
                </div>
                <div className="comment-phoneNum">
                  - {this.props.phoneNum}
                </div>
            </div>
      	);
    }
}
class RegisterForm extends React.Component {
    handleUsernameChange(username, index) {
        if (username.length <= 11) {
            store.dispatch(usernameChanging(username, index));
        }

        if (username.length === 11) {
            store.dispatch(addRegisteringUser());
        } else if (username.length === 0) {
            store.dispatch(removeRegisteringUser(index));
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();
        let usernames = [],
            c = findDOMNode(this.refs.passwordInput.refs.input).value,
            pxjg = findDOMNode(this.refs.pxjgInput.refs.input).value,
            { targetBigBankId, registeringUsers, targetSmallBankId } = this.props;

        registeringUsers.forEach(username => {
            if (username.length === 11) {
                usernames.push(username);
            }
        });
        if (uniformPassword.length < 6) {
            message.error('请输入正确的通用密码!', 2);
            return;
        }
        if (targetBigBankId === '' || targetSmallBankId === '') {
            message.error('请选择模块!', 2);
            return;
        }
        store.dispatch(fetchMulRegister(usernames, uniformPassword, pxjg, targetSmallBankId))
            .then(function (data) {
                if (data.error) {
                    message.error(`${data.result.errorAt.toString()} 注册失败`, 2);
                }
            });
        const form = this.refs.form.getDOMNode();
        this.props.onSubmit({bigBlock: targetBigBankId,
                            smallBlock: targetSmallBankId,
                            instruction: pxjg,
                            password: uniformPassword,
                            phoneNum: usernames});
        form.reset();
    }

    componentDidUpdate() {
        findDOMNode(this.refs[`input-${this.props.registeringUsers.length - 1}`].refs.input).focus();
    }

    render() {
        return (
            <div ref="form">
                <div className="title-wrapper">
                    <h1 className="page-title">批量注册</h1>
                    <span className="page-extra search-box">
                        <Input type="text" placeholder="通用密码"  ref="passwordInput" />
                        <Input type="text" placeholder="培训机构"  ref="pxjgInput" />
                        <BankSelect />
                    </span>
                    <hr/>
                </div>
                <div className="content-wrapper">
                    <div className="user-list-wrapper">
                        <div className="input-group">
                            <Row>
                                {this.props.registeringUsers.map((username, index) => {
                                    return (
                                        <Col span={8} key={index}>
                                            <Input className="username-input"
                                                   placeholder="请输入手机号码"
                                                   ref={`input-${index}`}
                                                   onChange={e => this.handleUsernameChange(e.target.value, index)}
                                                   value={username}/>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    </div>
                </div>
                <div className="tool-bar">
                    <div id="buttons">
                        <Button type="submit" className="button-no-border"
                                onSubmit={e => this.handleOnSubmit(e)}>确定</Button>
                    </div>
                </div>
            </div>
        )
    }
}
class RegisterList extends React.Component{
    render() {
        var commentsNode = this.props.comments.map(function(comment, index) {
            return <Comment key={'comment-' + index}
                            bigBlock={comment.bigBlock}
                            smallBlock={comment.smallBlock}
                            instruction={comment.instruction}
                            password={comment.password}>
                    {comment.phoneNum}
                    </Comment>
        });
        return (
            <div className="comment-list">
                {commentsNode}
            </div>
        );
    }
}
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments:props.comments || []
        };
    }
    loadDataFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      success: comments => {
        this.setState({comments: comments});
      },
      error: (xhr, status, err) => {
        console.log(err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  handleNewComment(comment) {

    const comments = this.state.comments;
    const newComments = comments.concat([comment]);
    this.setState({comments: newComments});

    setTimeout(() => {
      $.ajax({
        url: this.props.url,
        dataType: "json",
        type: "POST",
        data: comment,
        success: comments => {
          this.setState({comments: comments});
        },
        error: (xhr, status, err) => {
          console.log(err.toString());
          this.setState({comments: comments});
        }
      });
    }, 2000);

  }

  render() {
    return (
      <div className="comment-box">
        <h1>Register</h1>
        <CommentList comments={this.state.comments}/>
        <CommentForm onSubmit={comment => this.handleNewComment(comment)}/>
      </div>
    );
  }
}

box = React.render(
  <Register url="comments.json"/>,
  document.getElementById('registerBox')
);

function mapStateToProps(state) {
    return {
        registeringUsers: state.registeringUsers,
        uniformPassword: state.uniformPassword,
        bigBanks: state.bigBanks,
        smallBanks: state.smallBanks,
        targetBigBankId: state.targetBigBankId,
        targetSmallBankId: state.targetSmallBankId
    }
}

export default connect(mapStateToProps)(RegisterComponent);
