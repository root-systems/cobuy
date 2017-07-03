import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm, FormSection, FieldArray } from 'redux-form'
import { pipe } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

import styles from '../styles/Offerings'

import Button from '../../app/components/Button'

class Offering extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasChildOffering: false
    }
  }

  render () {
    const { fields, offering, index, isChild } = this.props
    return (
      <div key={index}>
        {
          isChild
          ? null
          : <Button type='button' title='Remove Offering' onClick={() => fields.remove(index)}>
              Remove Offering
            </Button>
        }
        <Field
          name={ isChild ? 'quantity' : `${offering}.quantity` }
          floatingLabelText='Quantity'
          component={TextField}
        />
        <Field
          name={ isChild ? 'unit' : `${offering}.unit`}
          floatingLabelText='Unit'
          component={SelectField}
        >
          <MenuItem value='kg' primaryText='Kg' />
          <MenuItem value='litres' primaryText='Litres' />
          <MenuItem value='ea' primaryText='Each (Discrete)' />
        </Field>
        <Field
          name={ isChild ? 'resource' : `${offering}.resource`}
          floatingLabelText='Product Name'
          component={TextField}
        />
        <Field
          name={ isChild ? 'hasNested' : `${offering}.hasNested`}
          component={Toggle}
          label='which contains'
          labelPosition='left'
          defaultToggled={false}
          value={this.state.hasChildOffering}
          onChange={(e, val) => { this.setState({ hasChildOffering: val }) }}
        />
        {
          this.state.hasChildOffering
          ? <FormSection name={ isChild ? 'offering' : `${offering}.offering`}>
              <Offering isChild={true} key={index} />
            </FormSection>
          : null
        }
      </div>
    )
  }
}

class OfferingList extends React.Component {
  render () {
    const { fields } = this.props
    return (
      <div>
        {fields.map((offering, index) =>
          <Offering key={index} fields={fields} offering={offering} index={index} isChild={false} />
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

export default pipe(
  connectFela(styles),
  connectForm({
    form: 'offerings'
  })
)(Offerings)
