import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import AvatarField from '../components/AvatarField'

import initFelaStorybook from '../helpers/initFelaStorybook'
import initFormStorybook from '../helpers/initFormStorybook'

const FelaProvider = initFelaStorybook()
const FormProvider = initFormStorybook()

const AvatarForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field name='avatar' label='Avatar' component={AvatarField} />
    </form>
  )
}
const ConnectedAvatarForm = reduxForm({
  form: 'text',
  initialValues: {
    avatar: 'http://dinosaur.is/images/mikey-small.jpg'
  }
})(AvatarForm)

storiesOf('app.AvatarField', module)
  .addDecorator(FelaProvider)
  .addDecorator(FormProvider)
  .add('default', () => (
    <ConnectedAvatarForm />
  ))
