/* global document */
import React from 'react'
import { createRenderer } from 'fela'
import { Provider as FelaProvider } from 'react-fela'
import { StyleProvider as VeelProvider } from 'veel'

import rootConfig from '../../root'
import styleConfig from '../../style'
import baseTheme from '../../app/themes/base'

const renderer = createRenderer()
const stylesheet = document.querySelector(rootConfig.styleNode)
styleConfig.setup(renderer)

export default () =>
  story => {
    return (
      <FelaProvider renderer={renderer} mountNode={stylesheet}>
        <VeelProvider renderer={renderer} config={baseTheme}>
          {story()}
        </VeelProvider>
      </FelaProvider>
    )
  }
