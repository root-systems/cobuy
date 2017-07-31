import React from 'react'
import { connect as connectFela } from 'react-fela'
import { compose } from 'recompose'
import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/Home'

function Home (props) {
  const { routes, styles } = props

  return (
    <div className={styles.container}>
      <FormattedMessage
        id='app.name'
        className={styles.titleText}
      />
    </div>
  )
}

export default compose(
  connectFela(styles)
)(Home)
