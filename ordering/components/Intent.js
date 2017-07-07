import React from 'react'
import Slider from 'material-ui/Slider'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { merge, pipe } from 'ramda'
import { connect as connectFela } from 'react-fela'

import styles from '../styles/Intent'

function Intent (props) {
  const { onChange, value, styles, min, max, step } = props

  return (
    <div className={styles.container}>
      <svg className={styles.minLineContainer}>
        <line className={styles.minLine} x1='0' y1='20' x2='0' y2='200' />
      </svg>
      <svg className={styles.maxLineContainer}>
        <line className={styles.maxLine} x1='0' y1='20' x2='0' y2='200' />
      </svg>
      {renderSlider({ name: 'minimum' })}
      {renderSlider({ name: 'desired' })}
      {renderSlider({ name: 'maximum' })}
    </div>
  )

  function renderSlider (options) {
    const { name } = options
    const selectionColourBySliderName = {
      'minimum': 'skyblue',
      'desired': 'green',
      'maximum': 'purple'
    }
    const sliderTheme = getMuiTheme({
      slider: {
        trackSize: 12
      }
    })
    return (
      <MuiThemeProvider muiTheme={sliderTheme}>
        <Slider
          onChange={handleChange(name)}
          value={value[name]}
          min={min}
          max={max}
          step={step}
          className={styles.slider}
        />
      </MuiThemeProvider>
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

export default pipe(
  connectFela(styles)
)(Intent)
