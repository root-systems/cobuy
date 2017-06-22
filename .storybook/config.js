/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, addDecorator } from '@storybook/react'

import initFelaStorybook from './helpers/initFelaStorybook'
import initFormStorybook from './helpers/initFormStorybook'
import initMuiStorybook from './helpers/initMuiStorybook'

function loadStories() {
  // add any topic stories here!
  require('../app/stories')
  require('../agents/stories')
}

const FelaProvider = initFelaStorybook()
const FormProvider = initFormStorybook()
const MuiProvider = initMuiStorybook()

// global decorators applied to all stories
addDecorator(FelaProvider)
addDecorator(FormProvider)
addDecorator(MuiProvider)

configure(loadStories, module);
