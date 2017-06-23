import React from 'react'
import { storiesOf } from '@storybook/react'

import Register from '../components/Register'

storiesOf('agents.Register', module)
  .add('basic', () => (
    <Register />
  ))
