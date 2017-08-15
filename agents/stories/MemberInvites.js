import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import MemberInvites from '../components/MemberInvites'

storiesOf('agents.MemberInvites', module)
  .add('basic', () => (
    h(MemberInvites, {
      onSubmit: action('submit')
    })
  ))
