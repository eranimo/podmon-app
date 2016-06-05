import React, { Component, PropTypes } from 'react'
import styles from './style.scss'
import { Link } from 'react-router'
import classnames from 'classnames'

import EVEIcon from '../EVEIcon'

class HeaderItem extends Component {
  render () {
    const { children, path, iconSrc, currentPath } = this.props
    console.log(currentPath, path)
    return (
      <li className={classnames({
        [styles.Header__active]: currentPath === path
      })}>
        <Link to={path}>
          <EVEIcon src={iconSrc} size={30} active={currentPath === path}>
            {children}
          </EVEIcon>
        </Link>
      </li>
    )
  }
}

class Header extends Component {
  renderMenuItem() {

  }
  render() {
    const { user, pathname } = this.props
    return (
      <header className={styles.Header}>
        <h1>Podmon</h1>
        <ul>
          <HeaderItem currentPath={pathname}
            path="/accounts"
            iconSrc={require('../../images/member.png')}>
            Personal
          </HeaderItem>
          <HeaderItem currentPath={pathname}
            path="/corporation"
            iconSrc={require('../../images/corporation.png')}>
            Corporation
          </HeaderItem>
          <HeaderItem currentPath={pathname}
            path="/alliance"
            iconSrc={require('../../images/alliances.png')}>
            Alliance
          </HeaderItem>
        </ul>
        <ul className={styles.Header__auth}>
          {user ?
          <li>
            <Link className={classnames({
                [styles.Header__active]: pathname === '/logout'
              })}
              to="/logout">
              Logout
            </Link>
          </li>
          :
          <li>
            <Link className={classnames({
                [styles.Header__active]: pathname === '/login'
              })}
              to="/login">
              Login
            </Link>
            <Link className={classnames({
                [styles.Header__active]: pathname === '/register'
              })}
              to="/register">
              Register
            </Link>
          </li>}
        </ul>
      </header>
    )
  }
}

export default Header
