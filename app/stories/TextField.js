import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import { TextField } from 'redux-form-material-ui'

import initFelaStorybook from '../helpers/initFelaStorybook'
import initFormStorybook from '../helpers/initFormStorybook'
import initMuiStorybook from '../helpers/initMuiStorybook'

const FelaProvider = initFelaStorybook()
const FormProvider = initFormStorybook()
const MuiProvider = initMuiStorybook()

const TextForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field name='name' floatingLabelText='Name' component={TextField} />
    </form>
  )
}
const ConnectedTextForm = reduxForm({ form: 'text' })(TextForm)

storiesOf('app.TextField', module)
  .addDecorator(FelaProvider)
  .addDecorator(FormProvider)
  .addDecorator(MuiProvider)
  .add('default', () => (
    <ConnectedTextForm />
  ))
