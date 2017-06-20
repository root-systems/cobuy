import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-fela'

import styles from '../styles/Avatar'

// https://ant.design/components/avatar/
function Avatar (props) {
  const { styles, agent } = props
  const { name } = agent
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {name}
      </div>
    </div>
  )
}

Avatar.propTypes = {
  agent: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

Avatar.defaultProps = {
  size: 'small'
}

export default connect(styles)(Avatar)
