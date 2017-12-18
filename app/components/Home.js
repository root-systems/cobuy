import React from 'react'
import { connect as connectFela } from 'react-fela'
import { compose } from 'recompose'
import { FormattedMessage } from '../../lib/Intl'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

import styles from '../styles/Home'

function Home (props) {
  const { routes, styles, config } = props
  const { app: { name: appName, tagline, bodyText } } = config

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText}>
          <FormattedMessage id='app.name' values={{appName}} />
        </h1>
        <p className={styles.taglineText}>
          <FormattedMessage id='app.tagline' values={{tagline}} />
        </p>
        <div className={styles.buttonsContainer}>
          <Link to={'/sign-in'}>
            <RaisedButton primary>
              <FormattedMessage
                id='agents.signIn'
                className={styles.buttonText}
              />
            </RaisedButton>
          </Link>
          <Link to={'/register'}>
            <RaisedButton primary>
              <FormattedMessage
                id='agents.register'
                className={styles.buttonText}
              />
            </RaisedButton>
          </Link>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <p className={styles.bodyText}>
          <FormattedMessage id='app.bodyText' values={{bodyText}} />
        </p>
      </div>
    </div>
  )
}

export default compose(
  connectFela(styles)
)(Home)
