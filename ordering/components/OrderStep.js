import h from 'react-hyperscript'
import { isNil, map } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela, withTheme } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'
import { Step, StepButton, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'

import styles from '../styles/OrderStep'

function OrderStep (props) {
  const { styles, theme, step, stepIndex, setStepIndex, isStatic = false } = props
  const { index, name, description, Icon, taskPlan, completed, ready } = step

  const hasTaskPlan = !isNil(taskPlan)

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
            color: (
              ready
                ? theme.colors.primary2
                : completed
                  ? theme.colors.text
                  : theme.colors.greys[3]
            )
          })
        ),
        onClick: isStatic ? null : () => {
          setStepIndex(index)
        }
      }, [
        h('h3', {
          className: styles.name
        }, [
          name
        ])
      ]),
      h(StepContent, {
      }, [
        h('p', {
          className: styles.description
        }, [
          description
        ]),
        hasTaskPlan && (
          h(RaisedButton, {
            onClick: () => {
              const route = `/tasks/${taskPlan.id}`
              console.log('navigate!', route)
            }
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
