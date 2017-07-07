import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe } from 'ramda'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/TaskWorkerLeaf'

function TaskWorkerLeaf (props) {
  const { styles, taskPlan, onComplete, onCancel } = props
  const { taskRecipe } = taskPlan
  const { id: taskRecipeId } = taskRecipe

  return (
    <div className={styles.container}>
      <Paper
        className={styles.header}
        zDepth={2}
      >
        <h2 className={styles.taskName}>
          <FormattedMessage
            id={`tasks.recipes.${taskRecipeId}`}
            className={styles.taskNameText}
          />
        </h2>
        <RaisedButton
          primary={true}
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
        COMPONENT
      </div>
    </div>
  )
}

export default pipe(
  connectFela(styles),
)(TaskWorkerLeaf)
