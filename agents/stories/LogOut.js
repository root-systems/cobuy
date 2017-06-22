import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import LogOut from '../components/LogOut'

storiesOf('agents.LogOut', module)
  .add('default', () => (
    <LogOut />
  ))
