import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import MemberIntentField from '../components/MemberIntentField'

const IntentForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field name='intent' component={MemberIntentField} />
    </form>
  )
}
const ConnectedIntentForm = reduxForm({ form: 'memberIntent' })(IntentForm)

storiesOf('ordering.MemberIntentField', module)
  .add('default', () => (
    <ConnectedIntentForm />
  ))
