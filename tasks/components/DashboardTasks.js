import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe, map, mapObjIndexed } from 'ramda'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'

import styles from '../styles/DashboardTasks'
import { FormattedMessage } from '../../lib/Intl'

function DashboardTasks (props) {
  const { styles, taskPlans } = props

  const renderChildTask = (childTaskPlan) => {
    return (
      <ListItem
        disabled={true}
      >
        <FormattedMessage
          id={`tasks.recipes.${childTaskPlan.taskRecipeId}`}
          className={styles.taskNameText}
        />
      </ListItem>
    )
  }

  const renderParentTask = (parentTaskPlan) => {
    return (
      <ListItem
        nestedItems={map(renderChildTask, parentTaskPlan.childTaskPlans)}
        containerElement={<Link to={`/tasks/${parentTaskPlan.id}`} />}
      >
        <FormattedMessage
          id={`tasks.recipes.${parentTaskPlan.taskRecipeId}`}
          className={styles.taskNameText}
        />
      </ListItem>
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
      <List>
        {map(renderParentTask, taskPlans)}
      </List>
    </div>
  )
}

export default pipe(
  connectFela(styles)
)(DashboardTasks)
