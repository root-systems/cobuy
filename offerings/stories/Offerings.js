import React from 'react'
import { storiesOf } from '@storybook/react'

import Offerings from '../components/Offerings'

storiesOf('offerings.Offerings', module)
  .add('basic', () => (
    <Offerings />
  ))
