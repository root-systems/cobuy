import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm, FormSection, FieldArray } from 'redux-form'
import { flow } from 'lodash'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

import styles from '../styles/Offerings'

import Button from '../../app/components/Button'

class ChildOffering extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasChildOffering: false
    }
  }

  render () {
    return (
      <div className={styles.container}>
        <Field name='quantity' floatingLabelText='Quantity' component={TextField} />
        <Field name='unit' floatingLabelText='Unit' component={SelectField} >
          <MenuItem value='kg' primaryText='Kg' />
          <MenuItem value='litres' primaryText='Litres' />
          <MenuItem value='ea' primaryText='Each (Discrete)' />
        </Field>
        <Field name='resource' floatingLabelText='Product Name' component={TextField} />
        <Field
          name='hasChild'
          component={Toggle}
          label='which contains'
          labelPosition='left'
          defaultToggled={false}
          value={this.state.hasChildOffering}
          onChange={(e, val) => { this.setState({ hasChildOffering: val }) }}
        />
        {
          this.state.hasChildOffering
          ? <FormSection name='offering'><ChildOffering /></FormSection>
          : null
        }
      </div>
    )
  }
}

class OfferingList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasChildOffering: false
    }
  }
  render () {
    const { fields } = this.props
    return (
      <div>
        {fields.map((offering, index) =>
          <div key={index}>
            <Button type='button' title='Remove Offering' onClick={() => fields.remove(index)}>
              Remove Offering
            </Button>
            <Field
              name={`${offering}.quantity`}
              floatingLabelText='Quantity'
              component={TextField}
            />
            <Field
              name={`${offering}.unit`}
              floatingLabelText='Unit'
              component={SelectField}
            >
              <MenuItem value='kg' primaryText='Kg' />
              <MenuItem value='litres' primaryText='Litres' />
              <MenuItem value='ea' primaryText='Each (Discrete)' />
            </Field>
            <Field
              name={`${offering}.resource`}
              floatingLabelText='Product Name'
              component={TextField}
            />
            <Field
              name={`${offering}.hasChild`}
              component={Toggle}
              label='which contains'
              labelPosition='left'
              defaultToggled={false}
              value={this.state.hasChildOffering}
              onChange={(e, val) => { this.setState({ hasChildOffering: val }) }}
            />
            {
              this.state.hasChildOffering
              ? <FormSection name={`${offering}.offering`}><ChildOffering /></FormSection>
              : null
            }
          </div>
        )}
        <Button type='button' onClick={() => fields.push({})}>Add Offering</Button>
      </div>
    )
  }
}

class Offerings extends React.Component {
  render () {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <FieldArray name='offerings' component={OfferingList} />
      </form>
    )
  }
}

export default flow(
  connectFela(styles),
  connectForm({
    form: 'offerings'
  })
)(Offerings)
