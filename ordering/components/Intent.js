import React from 'react'
import Slider from 'material-ui/Slider'
import { merge, pipe } from 'ramda'
import { connect as connectFela } from 'react-fela'

import styles from '../styles/Intent'

function Intent (props) {
  const { onChange, value, styles } = props

  return (
    <div className={styles.container}>
      <svg className={styles.minLineContainer}>
        <line className={styles.minLine} x1='20' y1='20' x2='20' y2='200' />
      </svg>
      <svg className={styles.maxLineContainer}>
        <line className={styles.maxLine} x1='20' y1='20' x2='20' y2='200' />
      </svg>
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

export default pipe(
  connectFela(styles)
)(Intent)
