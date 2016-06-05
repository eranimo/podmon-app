import React, { Component } from 'react'
import styles from './style.scss'
import classnames from 'classnames'

class EVEIcon extends Component {
  render () {
    const { size, children, active } = this.props
    return (
      <span className={classnames(styles.EVEIcon, {
          [styles['EVEIcon--active']]: active
        })}>
        <img src={this.props.src} width={size} height={size} />
        {children ? <div>{children}</div> : null}
      </span>
    )
  }
}

export default EVEIcon
