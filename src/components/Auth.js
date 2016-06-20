import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { getCharacters } from '../redux/characters'
import { checkAuth } from '../redux/auth'


class Auth extends Component {
  componentWillMount() {
    this.props.getCharacters()
    this.props.checkAuth()
  }
  render () {
    console.log(this.props);
    if (this.props.user) {
      return this.props.children
    }
    return <div>You are not logged in!</div>;
  }
};


const mapStateToProps = (state) => {
  return {
    ...state.auth,
    ...state.characters
  }
}

export default connect(mapStateToProps, { getCharacters, checkAuth })(Auth)
