import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as counterActions from '../actions/counterActions'

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

class Main extends Component {
  render (){
    const { counter, increment, decrement } = this.props

    return (
      <div>
        Main
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(Main)
