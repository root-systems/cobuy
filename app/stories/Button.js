import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from '../components/Button'

import initFelaStorybook from '../helpers/initFelaStorybook'

const FelaProvider = initFelaStorybook()

storiesOf('app.Button', module)
  .addDecorator(FelaProvider)
  .add('with text', () => (
    <Button onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      😀 😎 👍 💯
    </Button>
  ))
