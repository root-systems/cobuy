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
    image
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
  image: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

Avatar.defaultProps = {
  size: 'small'
}

export default connect(styles)(Avatar)
