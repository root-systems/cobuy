import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import TextField from '../components/TextField'

import initFelaStorybook from '../helpers/initFelaStorybook'
import initFormStorybook from '../helpers/initFormStorybook'

const FelaProvider = initFelaStorybook()
const FormProvider = initFormStorybook()

const defaultTextFieldInput = {
  name: 'name',
  onBlur: action('blur'),
  onChange: action('change'),
  onDragStart: action('dragStart'),
  onDrop: action('drop'),
  onFocus: action('focus'),
  value: 'Alice'
}
const defaultTextFieldMeta = {
  touched: false,
  error: null,
  warning: null
}
const TextForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field label='Name' component={TextField} />
    </form>
  )
}
const ConnectedTextForm = reduxForm({ form: 'text' })(TextForm)

storiesOf('app.TextField', module)
  .addDecorator(FelaProvider)
  .addDecorator(FormProvider)
  .add('raw', () => (
    <TextField
      label='Name'
      input={defaultTextFieldInput}
      meta={defaultTextFieldMeta}
    />
  ))
  .add('default', () => (
    <ConnectedTextForm />
  ))
