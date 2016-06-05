import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCharacter } from '../redux/character'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    character: state.character
  }
}

class Character extends Component {
  componentWillMount() {
    const { accountId, charId } = this.props.params
    this.props.fetchCharacter(accountId, charId)
  }
  render (){
    const { character: { character } } = this.props

    if (!character) {
      return <div>Loading...</div>
    } else {
      console.log(character)
      return (
        <div>
          <img src={character.public.portrait['64x64'].href} alt={character.public.name} />
          {character.public.name}
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, {fetchCharacter})(Character)
