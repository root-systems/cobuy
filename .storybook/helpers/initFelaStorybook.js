/* global document */
import React from 'react'
import { createRenderer } from 'veel'
import { Provider } from 'react-fela'

import rootConfig from '../../root'
import styleConfig from '../../style'

const renderer = createRenderer()
const stylesheet = document.querySelector(rootConfig.styleNode)
styleConfig.setup(renderer)

export default () =>
  story => {
    return (
      <Provider renderer={renderer} mountNode={stylesheet}>
        {story()}
      </Provider>
    )
  }
