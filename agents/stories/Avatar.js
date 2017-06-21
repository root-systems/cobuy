import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Avatar from '../components/Avatar'

const catz = 'http://random.cat/i/cute_animals_show_feeling_06.jpg'

storiesOf('agents.Avatar', module)
  .add('default', () => (
    <Avatar image={catz} />
  ))
  .add('small', () => (
    <Avatar size={'small'} image={catz} />
  ))
  .add('medium', () => (
    <Avatar size={'medium'} image={catz} />
  ))
  .add('large', () => (
    <Avatar size={'large'} image={catz} />
  ))
