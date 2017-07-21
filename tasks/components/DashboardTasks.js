import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe, map } from 'ramda'
import RaisedButton from 'material-ui/RaisedButton'

import styles from '../styles/DashboardTasks'
import { FormattedMessage } from '../../lib/Intl'

function DashboardTasks (props) {
  const { styles, taskPlans } = props

  const renderChildTask = (childTaskPlan) => {
    return (
      <div>
        <FormattedMessage
          id={`tasks.recipes.${childTaskPlan.taskRecipeId}`}
          className={styles.taskNameText}
        />
      </div>
    )
  }

  const renderParentTask = (parentTaskPlan) => {
    return (
      <div>
        <FormattedMessage
          id={`tasks.recipes.${parentTaskPlan.taskRecipeId}`}
          className={styles.taskNameText}
        />
        {map(renderChildTask, parentTaskPlan.childTaskPlans)}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        <FormattedMessage
          id='app.dashboard.tasks'
          className={styles.labelText}
        />
      </p>
      {map(renderParentTask, taskPlans)}
    </div>
  )
}

export default pipe(
  connectFela(styles)
)(DashboardTasks)
