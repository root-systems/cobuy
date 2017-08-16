import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe, map, values, isNil } from 'ramda'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'

import styles from '../styles/DashboardTasks'
import { FormattedMessage } from '../../lib/Intl'

function DashboardTasks (props) {
  const { styles, taskPlans = {}, actions, currentAgent } = props

  if (isNil(currentAgent)) { return null }

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
  const renderChildTasks = pipe(map(renderChildTask), values)

  const renderParentTask = (parentTaskPlan) => {
    return (
      <ListItem
        nestedItems={renderChildTasks(parentTaskPlan.childTaskPlans)}
        containerElement={<Link to={`/tasks/${parentTaskPlan.id}`} />}
      >
        <FormattedMessage
          id={`tasks.recipes.${parentTaskPlan.taskRecipeId}`}
          className={styles.taskNameText}
        />
      </ListItem>
    )
  }
  const renderParentTasks = pipe(map(renderParentTask), values)

  const createProfileTaskPlan = {
    assigneeId: currentAgent.id,
    taskRecipeId: 'createProfile',
    params: {}
  }

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        <FormattedMessage
          id='app.dashboard.tasks'
          className={styles.labelText}
        />
      </p>
      <RaisedButton onClick={ () => { actions.taskPlans.create(createProfileTaskPlan) }}>
        Create a create profile task plan, yo
      </RaisedButton>
      <List>
        {renderParentTasks(taskPlans)}
      </List>
    </div>
  )
}

export default pipe(
  connectFela(styles)
)(DashboardTasks)
