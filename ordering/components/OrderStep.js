import h from 'react-hyperscript'
import { isNil, map } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela, withTheme } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'
import { Step, StepButton, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'

import Hint from '../../app/components/Hint'
import styles from '../styles/OrderStep'

function OrderStep (props) {
  const { styles, theme, step, stepIndex, setStepIndex, isStatic = false, onNavigate } = props
  const { index, name, description, Icon, taskPlan, completed, ready, hint } = step

  const hasTaskPlan = !isNil(taskPlan)

  const statusColor = (
    ready
      ? theme.colors.primary2
      : completed
        ? theme.colors.text
        : theme.colors.greys[3]
  )

  return (
    h(Step, {
      className: styles.container,
      completed,
      active: stepIndex === index
    }, [
      h(isStatic ? StepLabel : StepButton, {
        className: styles.header,
        icon: (
          h(Icon, {
            color: statusColor
          })
        ),
        onClick: isStatic ? null : () => {
          setStepIndex(index)
        }
      }, [
        h('h3', {
          className: styles.name,
          style: {
            color: statusColor
          }
        }, [
          name
        ])
      ]),
      h(StepContent, {
      }, [
        h('p', {
          className: styles.description
        }, [
          description,
          h(Hint, {
            messageId: hint,
            position: 'top-right',
            iconSize: '24px'
          })
        ]),
        hasTaskPlan && (
          h(RaisedButton, {
            onClick: () => {
              const route = `/tasks/${taskPlan.id}`
              onNavigate(route)
            },
            primary: true,
            className: styles.button
          }, [
            h(FormattedMessage, {
              id: `tasks.recipes.${taskPlan.taskRecipeId}`,
              className: styles.taskNameText
            })
          ])
        )
      ])
    ])
  )
}

export default compose(
  connectFela(styles),
  withTheme
)(OrderStep)
