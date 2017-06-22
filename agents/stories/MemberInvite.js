import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import MemberInvite from '../components/MemberInvite'

storiesOf('agents.MemberInvite', module)
  .add('basic', () => (
    <MemberInvite isEditing={true} />
  ))
