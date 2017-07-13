import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe, map, not, isNil } from 'ramda'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/TaskWorkerTree'

function TaskWorkerTree (props) {
  const { styles, subTaskPlans, onNavigate } = props

  const mapSubTasks = map(subTaskPlan => {
    const { taskRecipe: subTaskRecipe, taskWork: subTaskWork } = subTaskPlan
    const { id: subTaskRecipeId } = subTaskRecipe
    return (
      <ListItem className={styles.subTaskItem}>
        <Checkbox
          label={
            <FormattedMessage
              id={`tasks.recipes.${subTaskRecipeId}`}
              className={styles.subTaskNameText}
            />
          }
          checked={not(isNil(subTaskWork))}
          className={styles.subTaskCheckbox}
          onCheck={handleNavigate(subTaskPlan)}
        />
      </ListItem>
    )
  })

  return (
    <List className={styles.subTaskList}>
      <Subheader className={styles.subTasksHeader}>
        <FormattedMessage
          id='tasks.tasks'
          className={styles.subTasksHeaderText}
        />
      </Subheader>
      {mapSubTasks(subTaskPlans)}
    </List>
  )

  function handleNavigate (subTaskPlan) {
    return (ev) => {
      onNavigate(subTaskPlan)
    }
  }
}

export default pipe(
  connectFela(styles),
)(TaskWorkerTree)
