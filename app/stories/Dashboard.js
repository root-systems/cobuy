import React from 'react'
import { storiesOf } from '@storybook/react'

import Dashboard from '../components/Dashboard'

storiesOf('app.Dashboard', module)
  .add('default', () => (
    <Dashboard startOrder={() => console.log('start the machine')} />
  ))
