import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { SignIn } from 'dogstack-agents/components'

const actions = {
  authentication: { signIn: () => {}, register: () => {} },
  router: { push: () => {} }
}

storiesOf('agents.SignIn', module)
  .add('default', () => (
    <SignIn actions={actions} />
  ))
