import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'
import jsf from 'json-schema-faker'

import schema from '../schemas/profile'
import Profile from '../components/Profile'

const fakeAgent = {
  profile: jsf(schema)
}

storiesOf('agents.Profile', module)
  .add('basic', () => (
      <Profile agent={fakeAgent} />
  ))
