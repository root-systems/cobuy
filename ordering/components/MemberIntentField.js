import React from 'react'
import Slider from 'material-ui/Slider'
import { merge } from 'ramda'

import Intent from './Intent'

export default MemberIntentField

function MemberIntentField (props) {
  const { input: { value, onChange } } = props
  const Controls = value == false ? PreIntent : Intent

  return (
    <div>
      <div>
        current value: {JSON.stringify(value)}
      </div>
      <Controls onChange={onChange} value={value} min={0} max={10} step={1} />
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
      minimum: newValue,
      desired: newValue,
      maximum: newValue
    })
  }
}
