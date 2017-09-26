import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import AvatarField from '../components/AvatarField'

const AvatarForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
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
  .add('default', () => (
    <ConnectedAvatarForm
    />
  ))
