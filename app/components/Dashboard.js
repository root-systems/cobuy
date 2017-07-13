import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe } from 'ramda'
import RaisedButton from 'material-ui/RaisedButton'

import styles from '../styles/Dashboard'
import { FormattedMessage } from '../../lib/Intl'

function Dashboard (props) {
  const { styles, startOrder } = props

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        <FormattedMessage
          id='app.dashboard'
          className={styles.labelText}
        />
      </p>
      <div className={styles.buttonContainer}>
        <RaisedButton className={styles.button} type='button' onClick={startOrder}>
          <FormattedMessage
            id='app.startOrder'
            className={styles.labelText}
          />
        </RaisedButton>
      </div>
    </div>
  )
}

export default pipe(
  connectFela(styles)
)(Dashboard)
