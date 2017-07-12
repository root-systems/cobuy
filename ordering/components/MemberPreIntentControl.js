import React from 'react'
import { merge, pipe } from 'ramda'
import { connect as connectFela } from 'react-fela'
import TextField from 'material-ui/TextField'
import BigMath from 'bigmath'
import DebounceInput from 'react-debounce-input'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/MemberPreIntentControl'

function MemberPreIntentControl (props) {
  const { styles, onChange, min, max, step } = props

  return (
    <div className={styles.container}>
      <DebounceInput
        element={TextField}
        debounceTimeout={500}
        name='desired'
        type='number'
        value={0}
        floatingLabelText={
          <FormattedMessage
            id='ordering.desired'
            className={styles.labelText}
          />
        }
        onChange={handleChange}
      />
    </div>
  )

  function handleChange (ev) {
    const newValue = ev.target.value
    const increment = BigMath.mul(step, '2')
    onChange({
      minimum: BigMath.max('0', BigMath.sub(newValue, increment)),
      desired: newValue,
      maximum: BigMath.add(newValue, increment)
    })
  }
}

export default pipe(
  connectFela(styles)
)(MemberPreIntentControl)
