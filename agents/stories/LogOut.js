import React from 'react'
import { storiesOf } from '@storybook/react'

import LogOut from '../components/LogOut'

storiesOf('agents.LogOut', module)
  .add('basic', () => (
    <LogOut />
  ))
