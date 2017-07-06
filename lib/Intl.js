import React from 'react'
import { FormattedMessage as OgFormattedMessage } from 'react-intl'
import { isNil } from 'ramda'

const classifyIntlMessage = (className) => {
  return {
    children: (...elements) => (
      <span className={className}>
        {elements}
      </span>
    )
  }
}

export const FormattedMessage = (props) => {
  return isNil(props.className)
    ? <OgFormattedMessage {...props} />
    : <OgFormattedMessage {...props} {...classifyIntlMessage(props.className)} />
}
