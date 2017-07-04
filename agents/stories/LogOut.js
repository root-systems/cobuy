import React from 'react'
import { storiesOf } from '@storybook/react'

import LogOut from '../components/LogOut'

const actions = {
  authentication: { logOut: () => {} }
}

storiesOf('agents.LogOut', module)
  .add('basic', () => (
    <LogOut actions={actions} />
  ))
