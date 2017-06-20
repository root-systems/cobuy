import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-fela'

import styles from '../styles/Profile'

function Profile (props) {
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

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
}

Profile.defaultProps = {
}

export default connect(styles)(Profile)
