import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import AddOffering from '../components/AddOffering'

const alice = {
  profile: {
    name: 'Alice',
    description: 'a cool cat',
    avatar: 'http://dinosaur.is/images/mikey-small.jpg'
  }
}
storiesOf('agents.AddOffering', module)
  .add('basic', () => (
    <AddOffering agent={alice} />
  ))
