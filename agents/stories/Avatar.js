import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Avatar from '../components/Avatar'

const catz = 'http://random.cat/i/cute_animals_show_feeling_06.jpg'

storiesOf('agents.Avatar', module)
  .add('default', () => (
    <Avatar avatar={catz} />
  ))
  .add('small', () => (
    <Avatar size={'small'} avatar={catz} />
  ))
  .add('medium', () => (
    <Avatar size={'medium'} avatar={catz} />
  ))
  .add('large', () => (
    <Avatar size={'large'} avatar={catz} />
  ))
