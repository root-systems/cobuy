import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import MemberInvites from '../components/MemberInvites'

storiesOf('agents.MemberInvites', module)
  .add('basic', () => (
    <MemberInvites />
  ))
