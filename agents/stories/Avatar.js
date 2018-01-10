import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Avatar from '../components/Avatar'

const alice = {
  profile: {
    avatar: 'http://random.cat/i/cute_animals_show_feeling_06.jpg',
    name: 'Alice',
    description: 'a cool cat'
  }
}

const bob = {
  profile: {
    name: 'Bob'
  }
}

const carol = {
  profile: {
  }
}

storiesOf('agents.Avatar', module)
  .add('default', () => (
    h(Avatar, {
      agent: alice
    })
  ))
  .add('small', () => (
    h(Avatar, {
      agent: alice,
      size: 'small'
    })
  ))
  .add('medium', () => (
    h(Avatar, {
      agent: alice,
      size: 'medium'
    })
  ))
  .add('large', () => (
    h(Avatar, {
      agent: alice,
      size: 'large'
    })
  ))
  .add('without avatar', () => (
    h(Avatar, {
      agent: bob
    })
  ))
  .add('without avatar or name', () => (
    h(Avatar, {
      agent: carol
    })
  ))
  .add('with icon, without avatar or name', () => (
    h(Avatar, {
      agent: carol,
      icon: 'user'
    })
  ))
