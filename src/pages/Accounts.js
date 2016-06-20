import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { fetchAccounts } from '../redux/accounts'
import { Link } from 'react-router'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

class Accounts extends Component {
  componentWillMount() {
    // this.props.fetchAccounts(this.props.user.id)
  }
  render (){
    return <div>Accounts</div>;
    // const { accounts: { accounts } } = this.props
    //
    // if (!accounts) {
    //   return <div>Loading...</div>
    // } else {
    //   console.log(accounts)
    //   return (
    //     <ul>
    //       Accounts:
    //       {accounts.map(({ pk, name }) => {
    //         return (
    //           <li key={name}>
    //             <Link to={`/account/${pk}`}>{name}</Link>
    //           </li>
    //         )
    //       })}
    //     </ul>
    //   )
    // }
  }
}

export default connect(mapStateToProps, {})(Accounts)
