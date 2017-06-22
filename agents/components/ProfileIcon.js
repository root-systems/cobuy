import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-fela'

import styles from '../styles/ProfileIcon'

import Avatar from './Avatar'

const imageSizePerFormat = {
  page: 'large',
  icon: 'small'
}

// https://ant.design/components/avatar/
function ProfileIcon (props) {
  const {
    format,
    styles,
    agent: { profile: { name, avatar } }
  } = props
  return (
    <div>
      <Avatar
        size={imageSizePerFormat[format]}
        avatar={avatar}
      />
      <span className={styles.name}>{name}</span>
    </div>
  )
}

ProfileIcon.propTypes = {
  agent: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired,
  format: PropTypes.oneOf(['page', 'icon'])
}

ProfileIcon.defaultProps = {
  format: 'page'
}

export default connect(styles)(ProfileIcon)
