import React from 'react'
import { FormattedMessage as OgFormattedMessage } from 'react-intl'
import { isNil } from 'ramda'

// GK: react-intl's FormattedMessage component can't take className as props directly: https://github.com/yahoo/react-intl/issues/704
// GK: hence we use a wrapper to pass in a child function: https://github.com/yahoo/react-intl/wiki/Components#string-formatting-components

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
