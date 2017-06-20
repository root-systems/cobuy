import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-fela'
import MuiAvatar from 'material-ui/Avatar'

import styles from '../styles/Avatar'

const sizeInPx = {
  small: 40,
  medium: 60,
  large: 80
}

// https://ant.design/components/avatar/
function Avatar (props) {
  const {
    size,
    styles,
    agent: { profile: { name, image } }
  } = props
  return (
    <span className={styles.container}>
      <MuiAvatar
        className={styles.image}
        size={sizeInPx[size]}
        src={image}
      />
    </span>
  )
}

Avatar.propTypes = {
  agent: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

Avatar.defaultProps = {
  size: 'small'
}

export default connect(styles)(Avatar)
