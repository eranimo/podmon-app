import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import { push } from 'react-router-redux'

class Logout extends Component {
  componentWillMount() {
    this.props.logout()
    this.props.push('/')
  }
  render (){
    return null
  }
}

export default connect(null, { logout, push })(Logout)
