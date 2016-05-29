import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAccounts } from '../redux/accounts'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    accounts: state.accounts
  }
}

class Main extends Component {
  componentWillMount() {
    console.log()
    // this.props.fetchAccount(this.props.location.query.id)
  }
  render (){
    const { accounts: { loading, accounts } } = this.props

    if (loading) {
      return <div>Loading...</div>
    } else {
      console.log(accounts)
      return (
        <ul>
          Crap
          {accounts.map(({ name }) => {
            return (
              <li>
                {name}
              </li>
            )
          })}
        </ul>
      )
    }
  }
}

export default connect(mapStateToProps, { fetchAccounts })(Main)
