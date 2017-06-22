import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Register from '../components/Register'

storiesOf('agents.Register', module)
  .add('default', () => (
    <Register />
  ))
