/* global document */
import React from 'react'
import { createRenderer } from 'fela'
import { Provider } from 'react-fela'

const renderer = createRenderer()
const ss = document.createElement('style')
ss.id = 'stylesheet'
document.body.appendChild(ss)
const stylesheet = document.querySelector('#stylesheet')

export default () =>
  story => {
    return (
      <Provider renderer={renderer} mountNode={stylesheet}>
        {story()}
      </Provider>
    );
  }
