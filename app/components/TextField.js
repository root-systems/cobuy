import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-fela'
import AutosizeInput from 'react-input-autosize'

import styles from '../styles/TextField'

// http://redux-form.com/6.8.0/examples/fieldLevelValidation/
function TextField (props) {
  const { input, label, type, meta } = props
  const { name, value } = input
  const { touched, error, warning } = meta
  return (
    <div className={styles.fieldContainer}>
      <label className={styles.label}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <AutosizeInput
          className={styles.autosizeContainer}
          inputClassName={styles.input}
          {...input}
          placeholder={label}
          type='text'
        />
        {
          touched
          ? error
            ? <span className={styles.error}>{error}</span>
            : warning
              ? <span className={styles.warning}>{warning}</span>
              : null
          : null
        }
      </div>
    </div>
  )
}

export default connect(styles)(TextField)
