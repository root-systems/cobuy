/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, addDecorator } from '@storybook/react'

const createRoot = require('dogstack/createRoot')

const config = require('../config/default').browser
window.config = config

function loadStories() {
  // add any topic stories here!
  require('../app/stories')
  require('../agents/stories')
  require('../supply/stories')
  require('../ordering/stories')
  require('../tasks/stories')
  require('../resources/stories')
}

import store from '../store'
import style from '../style'
import client from '../client'
import root from '../root'
import intl from '../intl'

const options = {
  config,
  store,
  style,
  client,
  root,
  intl
}

const renderRoot = createRoot(options)

// global decorator applied to all stories
addDecorator(story => {
  return renderRoot([
    story()
  ])
})

configure(loadStories, module)
