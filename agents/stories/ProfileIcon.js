import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import ProfileIcon from '../components/ProfileIcon'

const alice = {
  profile: {
    image: 'http://random.cat/i/cute_animals_show_feeling_06.jpg',
    name: 'Alice',
    description: 'a cool cat'
  }
}

storiesOf('agents.ProfileIcon', module)
  .add('default', () => (
    <ProfileIcon agent={alice} />
  ))
  .add('icon', () => (
    <ProfileIcon format={'icon'} agent={alice} />
  ))
  .add('page', () => (
    <ProfileIcon format={'page'} agent={alice} />
  ))
