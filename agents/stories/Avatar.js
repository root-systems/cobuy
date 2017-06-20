import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Avatar from '../components/Avatar'

const alice = { name: 'Alice' }

storiesOf('agents.Avatar', module)
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

