import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    handleOnChangeEmailInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handleLogin(this.state.email, this.state.password);
            if (data && data.errorCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }
            if (data && data.errorCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log("Login successful");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Email:</label>
                            <input type="text" className="form-control" placeholder="Enter your email" value={this.state.username}
                                onChange={(event) => { this.handleOnChangeEmailInput(event) }} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Enter your password" value={this.state.password}
                                onChange={(event) => { this.handleOnChangePasswordInput(event) }}
                                onKeyDown={(event) => this.handleOnKeyDown(event)}
                            />
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </div>
                        <div className="col-12 ">
                            <button className="btn-login" onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot Password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span>Or Login with:</span>
                        </div>
                        <div className="social-login col-12">
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
