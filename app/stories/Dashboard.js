import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Dashboard from '../components/Dashboard'

const actions = {
  ordering: {
    startOrder: action('ordering.startOrder')
  }
}

storiesOf('app.Dashboard', module)
  .add('default', () => (
    <Dashboard actions={actions} />
  ))
