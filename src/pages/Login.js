import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../actions/authActions'
import { push } from 'react-router-redux'


const mapStateToProps = (state) => {
  return { ...state.auth }
}

class Login extends Component {
  componentWillMount() {
    if (this.props.user) {
      this.props.push('/main')
    }
  }
  handleLogin() {
    const username = this.refs.username.value
    const password = this.refs.password.value
    this.props.login(username, password)
  }
  render (){
    return (
      <div>
        <h1>Login</h1>

        <label>
          Username
          <input type="text" ref="username" />
        </label>

        <label>
          Password
          <input type="password" ref="password" />
        </label>

        <button onClick={this.handleLogin.bind(this)}
          disabled={this.props.loggingIn}>
          Login
        </button>

        {this.props.loginError ? <div>{this.props.loginError}</div> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps, { login, push })(Login)
