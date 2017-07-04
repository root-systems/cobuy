import React from 'react'
import { storiesOf } from '@storybook/react'

import Register from '../components/Register'

const actions = {
  authentication: { register: () => {} },
  router: { push: () => {} }
}

storiesOf('agents.Register', module)
  .add('basic', () => (
    <Register actions={actions} />
  ))
