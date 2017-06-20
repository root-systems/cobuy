import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'

import Profile from '../components/Profile'

import initFelaStorybook from '../../app/helpers/initFelaStorybook'
import initFormStorybook from '../../app/helpers/initFormStorybook'
import initMuiStorybook from '../../app/helpers/initMuiStorybook'

const FelaProvider = initFelaStorybook()
const FormProvider = initFormStorybook()
const MuiProvider = initMuiStorybook()

const alice = {
  name: 'Alice',
  description: 'a cool cat',
  image: null
}
storiesOf('agents.Profile', module)
  .addDecorator(FelaProvider)
  .addDecorator(FormProvider)
  .addDecorator(MuiProvider)
  .add('basic', () => (
    <Profile profile={alice} />
  ))
