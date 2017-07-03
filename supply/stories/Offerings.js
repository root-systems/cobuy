import React from 'react'
import { storiesOf } from '@storybook/react'

import Offerings from '../components/Offerings'

storiesOf('supply.Offerings', module)
  .add('basic', () => (
    <Offerings />
  ))
