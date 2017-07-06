/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, addDecorator } from '@storybook/react'

import initFelaStorybook from './helpers/initFelaStorybook'
import initFormStorybook from './helpers/initFormStorybook'
import initMuiStorybook from './helpers/initMuiStorybook'
import initIntlStorybook from './helpers/initIntlStorybook'

window.config = require('../config/default').browser

function loadStories() {
  // add any topic stories here!
  require('../app/stories')
  require('../agents/stories')
  require('../supply/stories')
  require('../ordering/stories')
}

const FelaProvider = initFelaStorybook()
const FormProvider = initFormStorybook()
const MuiProvider = initMuiStorybook()
const IntlProvider = initIntlStorybook()

// global decorators applied to all stories
addDecorator(FelaProvider)
addDecorator(FormProvider)
addDecorator(MuiProvider)
addDecorator(IntlProvider)

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

configure(loadStories, module);
