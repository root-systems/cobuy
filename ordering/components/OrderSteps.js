import h from 'react-hyperscript'
import { map, prop, pipe, equals } from 'ramda'
import { compose, withState, branch, renderNothing } from 'recompose'
import { Stepper } from 'material-ui/Stepper'

import OrderStep from './OrderStep'

function OrderSteps (props) {
  const { steps, stepIndex, setStepIndex } = props

  const renderOrderSteps = map(step => {
    return h(OrderStep, {
      key: step.name,
      step,
      stepIndex,
      setStepIndex
    })
  })

  return (
    h(Stepper, {
      linear: false,
      orientation: 'vertical'
    }, [
      renderOrderSteps(steps)
    ])
  )
}

export default compose(
  branch(pipe(prop('stepIndex'), equals(-1)), renderNothing),
  withState('stepIndex', 'setStepIndex', prop('stepIndex'))
)(OrderSteps)
