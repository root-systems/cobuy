import React from 'react'
import Slider from 'material-ui/Slider'
import { merge } from 'ramda'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const defaultValue = {
  minimum: 1,
  desired: 3,
  maximum: 5
}

export default (props) => {
  const { input: { value, onChange } } = props
  const controls = value == ""
    ? <PreIntent onChange={onChange} />
    : <Intent onChange={onChange} value={value} />

  return (
    <div>
      <div>
        current value: {JSON.stringify(value)}
      </div>
      {controls}
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
      <Slider onChange={handleChange('minimum')} value={value.minimum} />
      <Slider onChange={handleChange('desired')} value={value.desired} />
      <Slider onChange={handleChange('maximum')} value={value.maximum} />
    </div>
  )

  function handleChange (key) {
    return (ev, newValue) => {
      onChange(merge(value, { [key]: newValue }))
    }
  }
}
