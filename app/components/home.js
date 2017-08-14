import React from 'react'
import { connect as connectFela } from 'react-fela'
import { compose } from 'recompose'
import { FormattedMessage } from '../../lib/Intl'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

import styles from '../styles/Home'

function Home (props) {
  const { routes, styles } = props

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText}>
          <FormattedMessage id='app.name' />
        </h1>
        <p className={styles.taglineText}>
          <FormattedMessage id='app.tagline' />
        </p>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.buttonsContainer}>
          <Link to={"/sign-in"}>
            <RaisedButton primary={true}>
              <FormattedMessage
                id='agents.signIn'
                className={styles.buttonText}
              />
            </RaisedButton>
          </Link>
          <Link to={"/register"}>
            <RaisedButton primary={true}>
              <FormattedMessage
                id='agents.register'
                className={styles.buttonText}
              />
            </RaisedButton>
          </Link>
        </div>
        <p className={styles.bodyText}>
          Cobuy is an app that makes buying groups easy to start, maintain, and grow. Using the collective buying power of a group, we can buy food in bulk directly from wholesalers. By cutting out retailers, we effectively eliminate retail food waste, save money and have access to a wider range of better quality products.
        </p>
      </div>
    </div>
  )
}

export default compose(
  connectFela(styles)
)(Home)
