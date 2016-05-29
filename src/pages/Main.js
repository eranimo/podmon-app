import React, { Component, PropTypes } from 'react'
import Counter from '../components/Counter'
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
      <Counter
        value={counter}
        onIncrement={increment}
        onDecrement={decrement}
      />
    )
  }
}

export default connect(mapStateToProps, counterActions)(Main)
