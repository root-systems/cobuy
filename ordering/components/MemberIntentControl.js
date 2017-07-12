import React from 'react'
import Slider from 'material-ui/Slider'
import { merge, pipe, isNil } from 'ramda'
import { connect as connectFela } from 'react-fela'
import BigMath from 'bigmath'
import TextField from 'material-ui/TextField'
import DebounceInput from 'react-debounce-input'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/MemberIntentControl'

// IDEA: inputs as labels that hover over

function MemberIntentControl (props) {
  const { onChange, value, styles, min, max, step } = props

  return (
    <div className={styles.container}>
      <div className={styles.inputsContainer}>
        {renderInput('minimum')}
        {renderInput('desired')}
        {renderInput('maximum')}
      </div>
      <div className={styles.slidersContainer}>
        <MinBracket styles={styles} />
        <MaxBracket styles={styles} />
        <DesiredLine styles={styles} />
        {renderSlider('maximum')}
        {renderSlider('desired')}
        {renderSlider('minimum')}
      </div>
    </div>
  )

  function renderSlider (name) {
    return (
      <div className={styles.sliderContainer}>
        <Slider
          onChange={handleChange(name)}
          value={Number(value[name])}
          min={Number(min)}
          max={Number(max)}
          step={Number(step)}
          className={styles.slider}
        />
      </div>
    )
  }

  function renderInput (name) {
    return (
      <DebounceInput
        element={TextField}
        debounceTimeout={500}
        className={styles.input}
        name={name}
        type='number'
        value={value[name]}
        floatingLabelText={
          <FormattedMessage
            id={`ordering.${name}`}
            className={styles.inputLabel}
          />
        }
        onChange={handleChange(name)}
      />
    )
  }

  function handleChange (key) {
    return (ev, newValue) => {
      newValue = isNil(newValue) ? String(ev.target.value) : String(newValue)
      var update = { [key]: newValue }

      if (key == 'minimum') {
        if (BigMath.greaterThan(newValue, value.desired)) {
          update.desired = newValue
        }
        if (BigMath.greaterThan(newValue, value.maximum)) {
          update.maximum = newValue
        }
      } else if (key == 'desired') {
        const diff = BigMath.sub(newValue, value.desired)
        update.minimum = BigMath.max(min, BigMath.add(value.minimum, diff))
        update.maximum = BigMath.min(max, BigMath.add(value.maximum, diff))
      } else if (key == 'maximum') {
        if (BigMath.lessThan(newValue, value.desired)) {
          update.desired = newValue
        }
        if (BigMath.lessThan(newValue, value.minimum)) {
          update.minimum = newValue
        }
      }
      onChange(merge(value, update))
    }
  }
}

export default pipe(
  connectFela(styles)
)(MemberIntentControl)

function MinBracket (props) {
  const { styles } = props
  return (
    <svg className={styles.minLineContainer}>
      <line className={styles.minLine} x1='0' y1='0' x2='0' y2='100%' />
    </svg>
  )
}

function MaxBracket (props) {
  const { styles } = props
  return (
    <svg className={styles.maxLineContainer}>
      <line className={styles.maxLine} x1='0' y1='0' x2='0' y2='100%' />
    </svg>
  )
}

function DesiredLine (props) {
  const { styles } = props
  return (
    <svg className={styles.desiredLineContainer}>
      <line className={styles.desiredLine} x1='0' y1='50%' x2='100%' y2='50%' />
    </svg>
  )
}
