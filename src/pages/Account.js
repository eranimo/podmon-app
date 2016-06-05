import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAccount } from '../redux/account'
import { Link } from 'react-router'


const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    account: state.account
  }
}

class Account extends Component {
  componentWillMount() {
    this.props.fetchAccount(this.props.params.accountId)
  }
  render (){
    const { account: { account } } = this.props

    if (!account) {
      return <div>Loading...</div>
    } else {
      console.log(account)
      return (
        <ul>
          Account {account.info.name}
          <ul>
            {account.characters.map(({ name, id }) => {
              return (
                <li>
                  <Link to={`/account/${account.info.pk}/character/${id}`}>{name}</Link>
                </li>
              )
            })}
          </ul>
        </ul>
      )
    }
  }
}

export default connect(mapStateToProps, {fetchAccount})(Account)
