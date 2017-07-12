import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import MemberIntentField from '../components/MemberIntentField'

// https://github.com/root-systems/cobuy/wiki/Models#offering
const avoOffering = {
  resourceType: {
    name: 'crate of avocados',
    items: [
      {
        resourceType: {
          name: 'avocado'
        },
        quantity: {
          step: '1',
          value: '24',
          unit: 'each'
        }
      },
      {
        resourceType: {
          name: 'crate'
        },
        quantity: {
          value: '1',
          unit: 'each'
        }
      }
    ]
  },
  priceSpecifications: [
    {
      minimum: '0',
      price: '100',
      currency: 'NZD'
    }
  ]
}

const IntentForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field name='intent' component={MemberIntentField} offering={avoOffering} />
    </form>
  )
}
const ConnectedIntentForm = reduxForm({ form: 'memberIntent' })(IntentForm)

storiesOf('ordering.MemberIntentField', module)
  .add('default', () => (
    <ConnectedIntentForm />
  ))
