import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import Profile from '../components/Profile'

const alice = {
  name: 'Alice',
  description: 'a cool cat',
  image: null
}
storiesOf('agents.Profile', module)
  .add('basic', () => (
    <Profile profile={alice} />
  ))
