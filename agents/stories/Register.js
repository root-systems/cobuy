import React from 'react'
import { storiesOf } from '@storybook/react'

import { Register } from 'dogstack-agents/components'

const actions = {
  authentication: { register: () => {} },
  router: { push: () => {} }
}

storiesOf('agents.Register', module)
  .add('basic', () => (
    <Register actions={actions} />
  ))
