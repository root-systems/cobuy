import React from 'react'
import { storiesOf } from '@storybook/react'

import Navigation from '../components/Navigation'

storiesOf('app.Navigation', module)
  .add('default', () => (
    <Navigation navigationRoutes={[]} />
  ))
