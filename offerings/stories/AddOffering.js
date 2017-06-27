import React from 'react'
import { storiesOf } from '@storybook/react'

import AddOffering from '../components/AddOffering'

storiesOf('agents.AddOffering', module)
  .add('basic', () => (
    <AddOffering />
  ))
