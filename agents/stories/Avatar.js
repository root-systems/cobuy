import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Avatar from '../components/Avatar'

import initFelaStorybook from '../../app/helpers/initFelaStorybook'

const FelaProvider = initFelaStorybook()

const alice = { name: 'Alice' }

storiesOf('agents.Avatar', module)
  .addDecorator(FelaProvider)
  .add('default', () => (
    <Avatar agent={alice} />
  ))
  .add('small', () => (
    <Avatar size={'small'} agent={alice} />
  ))
  .add('medium', () => (
    <Avatar size={'medium'} agent={alice} />
  ))
  .add('large', () => (
    <Avatar size={'large'} agent={alice} />
  ))

