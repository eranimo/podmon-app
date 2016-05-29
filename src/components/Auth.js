import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkLogin } from '../redux/auth'


class Auth extends Component {
  componentWillMount() {
    this.checkAuth(this.props.user)
  }
  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps.user);
  }
  checkAuth(user) {
    if (!user) {
      this.props.checkLogin()
    }
  }
  render () {
    if (this.props.user) {
      return this.props.children
    }
    return null
  }
};


const mapStateToProps = (state) => {
  return { ...state.auth }
}

export default connect(mapStateToProps, { checkLogin })(Auth)
