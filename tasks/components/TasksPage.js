import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import { pipe, map, values, isNil } from 'ramda'
import { compose } from 'recompose'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'

import styles from '../styles/DashboardTasks'
import { FormattedMessage } from 'dogstack/intl'

function TasksPage (props) {
  const {
    styles,
    taskPlans = {},
    currentAgent
  } = props

  if (isNil(currentAgent)) return null

  const renderChildTask = (childTaskPlan) => {
    return (
      h(ListItem, {
        disabled: true,
        key: childTaskPlan.id,
      }, [
        h(FormattedMessage, {
          id: `tasks.recipes.${childTaskPlan.taskRecipeId}`,
          className: styles.taskNameText
        })
      ])
    )
  }
  const renderChildTasks = pipe(map(renderChildTask), values)

  const renderParentTask = (parentTaskPlan) => {
    return (
      h(ListItem, {
        key: parentTaskPlan.id,
        nestedItems: renderChildTasks(parentTaskPlan.childTaskPlans),
        containerElement: (
          h(Link, { to: `/tasks/${parentTaskPlan.id}` })
        )
      }, [
        h(FormattedMessage, {
          id: `tasks.recipes.${parentTaskPlan.taskRecipeId}`,
          className: styles.taskNameText
        })
      ])
    )
  }
  const renderParentTasks = pipe(map(renderParentTask), values)

  return (
    h('div', {
      className: styles.container
    }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'app.dashboard.tasks',
          className: styles.labelText
        })
      ]),
      h(List, [
        renderParentTasks(taskPlans)
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(TasksPage)
