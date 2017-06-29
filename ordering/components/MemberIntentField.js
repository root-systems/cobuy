import React from 'react'
import Slider from 'material-ui/Slider'
import { merge } from 'ramda'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default MemberIntentField

function MemberIntentField (props) {
  const { input: { value, onChange } } = props
  const Controls = value == false ? PreIntent : Intent

  return (
    <div>
      <div>
        current value: {JSON.stringify(value)}
      </div>
      <Controls onChange={onChange} value={value} />
    </div>
  )
}

function PreIntent (props) {
  const { onChange } = props

  return (
    <Slider
      onChange={handleChange}
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

function Intent (props) {
  const { onChange, value } = props

  return (
    <div>
      {renderSlider('minimum')}
      {renderSlider('desired')}
      {renderSlider('maximum')}
    </div>
  )

  function renderSlider (key) {
    return (
      <Slider
        onChange={handleChange(key)}
        value={value[key]}
      />
    )
  }

  function handleChange (key) {
    return (ev, newValue) => {
      onChange(merge(value, { [key]: newValue }))
    }
  }
}
