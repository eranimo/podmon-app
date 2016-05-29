import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return { user: state.auth.user }
}

class App extends Component {
  render (){
    const { children, user } = this.props

    return (
      <div>
        <h1>PodMon</h1>
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/accounts">Main</Link>
            </li>
            {user ?
              <div>
                <li>Welcome <b>{user.username}</b></li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </div>
              : null}
          </ul>
        </header>
        {children}
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
