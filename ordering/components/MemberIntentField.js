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
      min={0}
      max={10}
      step={1}
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

/*
  {renderSlider({ name: 'minimum', min: 0, max: value.desired })}
  {renderSlider({ name: 'desired', min: value.minimum, max: value.maximum })}
  {renderSlider({ name: 'maximum', max: 10, min: value.desired })}
*/

function Intent (props) {
  const { onChange, value } = props

  return (
    <div>
      {renderSlider({ name: 'minimum' })}
      {renderSlider({ name: 'desired' })}
      {renderSlider({ name: 'maximum' })}
    </div>
  )

  function renderSlider (options) {
    const { name } = options
    return (
      <Slider
        onChange={handleChange(name)}
        value={value[name]}
        min={0}
        max={10}
        step={1}
      />
    )
  }

  function handleChange (key) {
    return (ev, newValue) => {
      var update = { [key]: newValue }

      if (key == 'minimum') {
        if (newValue > value.desired) {
          update.desired = newValue
        }
        if (newValue > value.maximum) {
          update.maximum = newValue
        }
      } else if (key == 'desired') {
        const diff = newValue - value.desired
        update.minimum = Math.max(0, value.minimum + diff)
        update.maximum = Math.min(10, value.maximum + diff)
      } else if (key == 'maximum') {
        if (newValue < value.desired) {
          update.desired = newValue
        }
        if (newValue < value.minimum) {
          update.minimum = newValue
        }
      }
      onChange(merge(value, update))
    }
  }
}
