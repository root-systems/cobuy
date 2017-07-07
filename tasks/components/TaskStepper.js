import React from 'react'
import { map, addIndex } from 'ramda'
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import {
  compose,
  withState,
  withHandlers,
  pure
} from 'recompose'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { FormattedMessage } from '../../lib/Intl'

const mapIndexed = addIndex(map)

function TaskStepper (props) {
  const { steps, stepIndex, setStepIndex, handleNext, handlePrev } = props

  const renderSteps = mapIndexed((step, index) => {
    const { id, content } = step
    return (
      <Step>
        <StepButton onTouchTap={() => setStepIndex(index)}>
          <FormattedMessage id={id} />
        </StepButton>
        <StepContent>
          {content}
          {renderStepActions(index)}
        </StepContent>
      </Step>
    )
  })

  return (
    <Stepper
      activeStep={stepIndex}
      linear={false}
      orientation="vertical"
    >
      {renderSteps(steps)}
    </Stepper>
  )

  function renderStepActions (index) {
    return (
      <div>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          secondary={true}
          onTouchTap={handleNext}
        />
        {index > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={handlePrev}
          />
        )}
      </div>
    )
  }
}

export default compose(
  withState('stepIndex', 'setStepIndex', 0),
  withHandlers({
    handleNext: ({ steps, stepIndex, setStepIndex }) => ev => {
      if (stepIndex < steps.length) {
        setStepIndex(stepIndex + 1)
      }
    },

    handlePrev: ({ steps, stepIndex, setStepIndex }) => ev => {
      if (stepIndex > 0) {
        setStepIndex(stepIndex - 1)
      }
    }
  }),
  pure
)(TaskStepper)
