import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe, map, not, isEmpty } from 'ramda'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/TaskWorkerTree'

function TaskWorkerTree (props) {
  const { styles, childTaskPlans, onNavigate } = props

  const mapSubTasks = map(childTaskPlan => {
    const { taskRecipe: childTaskRecipe, hasWork: childHasWork } = childTaskPlan
    const { id: childTaskRecipeId } = childTaskRecipe
    return (
      <Link to={`/tasks/${childTaskPlan.id}`} style={{ textDecoration: 'none' }}>
        <ListItem className={styles.childTaskItem}>
          <Checkbox
            label={
              <FormattedMessage
                id={`tasks.recipes.${childTaskRecipeId}`}
                className={styles.childTaskNameText}
              />
            }
            checked={childHasWork}
            className={styles.childTaskCheckbox}
            // GK: onCheck event handler callback not responding consistently
            // GK: using Link wrapper as a workaround for now
            // onCheck={handleNavigate(childTaskPlan)}
          />
        </ListItem>
      </Link>
    )
  })

  return (
    <List className={styles.childTaskList}>
      <Subheader className={styles.childTasksHeader}>
        <FormattedMessage
          id='tasks.tasks'
          className={styles.childTasksHeaderText}
        />
      </Subheader>
      {mapSubTasks(childTaskPlans)}
    </List>
  )

  function handleNavigate (childTaskPlan) {
    return (ev) => {
      onNavigate(childTaskPlan)
    }
  }
}

export default pipe(
  connectFela(styles)
)(TaskWorkerTree)
