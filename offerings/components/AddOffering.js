import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { flow } from 'lodash'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

import styles from '../styles/AddOffering'

import Button from '../../app/components/Button'

class AddOffering extends React.Component {
  render () {
    return (
      <form className={styles.container}>
        <Field name='quantity' floatingLabelText='Quantity' component={TextField} />
        <Field name='unit' floatingLabelText='Unit' component={SelectField} >
          <MenuItem value='kg' primaryText='Kg' />
          <MenuItem value='litres' primaryText='Litres' />
          <MenuItem value='ea' primaryText='Each (Discrete)' />
        </Field>
        <Field name='resoure' floatingLabelText='Product Name' component={TextField} />
        <Field
          name='nested'
          component={Toggle}
          label='which contains'
          labelPosition='left'
        />
      </form>
    )
  }
}

export default flow(
  connectFela(styles),
  connectForm({
    form: 'addOffering'
  })
)(AddOffering)
