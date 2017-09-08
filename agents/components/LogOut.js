import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { connect as connectFela } from 'react-fela'
import { pipe } from 'ramda'
import { FormattedMessage } from 'dogstack/intl'

import styles from '../styles/LogOut'

function LogOut (props) {
  const {
    styles,
    actions,
    as: Component = FlatButton,
    ...moreProps
  } = props
  return (
    <Component
      className={styles.container}
      onClick={actions.authentication.logOut}
      {...moreProps}
    >
      <FormattedMessage
        id='agents.logOut'
        className={styles.buttonText}
      />
    </Component>
  )
}

export default pipe(
  connectFela(styles)
)(LogOut)
