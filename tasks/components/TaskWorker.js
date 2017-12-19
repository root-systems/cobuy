import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe, length, gt, all, prop, propOr, path, either, complement, not, isNil, isEmpty, tap } from 'ramda'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/TaskWorker'
import TaskWorkerTree from './TaskWorkerTree'

const getSubTaskPlans = propOr([], 'childTaskPlans')
const getIsTaskComplete = pipe(prop('hasWork'))
const getAreAllSubTasksComplete = pipe(getSubTaskPlans, all(getIsTaskComplete))
const getHasSubTasks = pipe(getSubTaskPlans, childTaskPlans => gt(length(childTaskPlans), 0))
const getIsTaskReadyToComplete = either(complement(getHasSubTasks), getAreAllSubTasksComplete)
const getTaskComponent = path(['taskRecipe', 'Component'])

function TaskWorker (props) {
  const { styles, taskPlan, onNavigate, onComplete, onCancel } = props
  if (isNil(taskPlan)) return null
  const { taskRecipe } = taskPlan
  const { id: taskRecipeId } = taskRecipe
  const childTaskPlans = getSubTaskPlans(taskPlan)
  const hasSubTasks = getHasSubTasks(taskPlan)
  const isTaskComplete = getIsTaskComplete(taskPlan)
  const isTaskReadyToComplete = getIsTaskReadyToComplete(taskPlan)
  const taskComponent = getTaskComponent(taskPlan)
  const Component = isNil(taskComponent)
    ? TaskWorkerTree
    : taskComponent
  const statusIconName = isTaskComplete
    ? 'check-circle'
    : 'circle-o'

  return (
    <div className={styles.container}>
      <Paper
        className={styles.header}
        zDepth={2}
      >
        <FontIcon
          className={`${styles.statusIcon} fa fa-${statusIconName}`}
        />
        <h2 className={styles.taskName}>
          <FormattedMessage
            id={`tasks.recipes.${taskRecipeId}`}
            className={styles.taskNameText}
          />
        </h2>
        <RaisedButton
          primary
          disabled={not(isTaskReadyToComplete)}
          className={styles.completeButton}
          onClick={handleComplete}
          label={
            <FormattedMessage
              id={`tasks.completeTask`}
              className={styles.completeButtonText}
            />
          }
        />
        <FlatButton
          className={styles.cancelButton}
          onClick={handleCancel}
          label={
            <FormattedMessage
              id={`tasks.cancelTask`}
              className={styles.cancelButtonText}
            />
          }
        />
      </Paper>
      <div className={styles.component}>
        <Component
          taskPlan={taskPlan}
          childTaskPlans={childTaskPlans}
          onNavigate={onNavigate}
          onComplete={onComplete}
          onCancel={onCancel}
        />
      </div>
    </div>
  )

  function handleComplete (ev) {
    onComplete(taskPlan)
  }
  function handleCancel (ev) {
    onCancel(taskPlan)
  }
}

export default pipe(
  connectFela(styles)
)(TaskWorker)
