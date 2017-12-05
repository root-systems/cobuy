import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe } from 'ramda'
import Divider from 'material-ui/Divider'

import styles from '../styles/Dashboard'
import { FormattedMessage } from 'dogstack/intl'
import DashboardOrders from '../../ordering/components/DashboardOrders'

function Dashboard (props) {
  const { styles, actions, taskPlans, currentAgent } = props
  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        <FormattedMessage
          id='app.dashboard'
          className={styles.labelText}
        />
      </p>
      <div className={styles.ordersContainer}>
        <DashboardOrders actions={actions} />
      </div>
      <Divider className={styles.divider} />
    </div>
  )
}

export default pipe(
  connectFela(styles)
)(Dashboard)
