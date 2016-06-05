import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import '../styles/app.scss'
import Header from '../components/Header'
const mapStateToProps = (state) => {
  return { user: state.auth.user }
}

class App extends Component {
  render (){
    const { children, user, location } = this.props

    return (
      <div>
        <Header user={user} pathname={location.pathname} />
        {children}
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
