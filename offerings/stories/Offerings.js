import React from 'react'
import { storiesOf } from '@storybook/react'

import Offerings from '../components/Offerings'

storiesOf('offerrings.Offerings', module)
  .add('basic', () => (
    <Offerings />
  ))
