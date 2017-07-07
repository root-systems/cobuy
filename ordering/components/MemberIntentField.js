import React from 'react'
import Slider from 'material-ui/Slider'

import Intent from './Intent'

export default MemberIntentField

function MemberIntentField (props) {
  const { input: { value, onChange }, min, max, step } = props
  const Controls = value == false ? PreIntent : Intent

  return (
    <div>
      <div>
        current value: {JSON.stringify(value)}
      </div>
      <Controls onChange={onChange} value={value} min={min} max={max} step={step} />
    </div>
  )
}

function PreIntent (props) {
  const { onChange, min, max, step } = props

  return (
    <Slider
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
    />
  )

  function handleChange (ev, newValue) {
    onChange({
      minimum: newValue - step,
      desired: newValue,
      maximum: newValue + step
    })
  }
}
