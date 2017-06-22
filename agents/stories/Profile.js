import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import Profile from '../components/Profile'

const alice = {
  profile: {
    name: 'Alice',
    description: 'a cool cat',
    avatar: 'http://dinosaur.is/images/mikey-small.jpg'
  }
}
storiesOf('agents.Profile', module)
  .add('basic', () => (
    <Profile agent={alice} />
  ))
