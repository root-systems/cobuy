import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm, FormSection } from 'redux-form'
import { flow } from 'lodash'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

import styles from '../styles/AddOffering'

import Button from '../../app/components/Button'

class AddOffering extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasNestedForm: false
    }
  }

  render () {
    return (
      <form className={styles.container}>
        <Field name='quantity' floatingLabelText='Quantity' component={TextField} />
        <Field name='unit' floatingLabelText='Unit' component={SelectField} >
          <MenuItem value='kg' primaryText='Kg' />
          <MenuItem value='litres' primaryText='Litres' />
          <MenuItem value='ea' primaryText='Each (Discrete)' />
        </Field>
        <Field name='resource' floatingLabelText='Product Name' component={TextField} />
        <Field
          name='nested'
          component={Toggle}
          label='which contains'
          labelPosition='left'
          defaultToggled={false}
          onChange={(e, val) => { this.setState({ hasNestedForm: val }) }}
        />
        {
          this.state.hasNestedForm
          ? <FormSection name='nestedForm'><AddOffering /></FormSection>
          : null
        }
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
