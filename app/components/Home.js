import React from 'react'
import { connect as connectFela } from 'react-fela'
import { compose } from 'recompose'
import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/Home'

function Home (props) {
  const { routes, styles } = props

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText}>
          <FormattedMessage id='app.name' />
        </h1>
      </div>
      <div className={styles.bodyContainer}>
        <p className={styles.bodyText}>
          Cobuy is an app that makes buying groups/co-ops easy to start, maintain, and grow. Using the collective buying power of a group, people can buy food in bulk directly from wholesalers. By cutting out retailers, we effectively eliminate retail food waste, save money and have access to a wider range of better quality products.
        </p>
      </div>
    </div>
  )
}

export default compose(
  connectFela(styles)
)(Home)
