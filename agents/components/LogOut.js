import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { connect as connectFela } from 'react-fela'
import { pipe } from 'ramda'
import { FormattedMessage } from '../../../cobuy/lib/Intl'

import classifyIntlMessage from '../../app/helpers/classifyIntlMessage'

import styles from '../styles/LogOut'

function LogOut (props) {
  const { styles, actions } = props
  return (
    <FlatButton
      className={styles.container}
      backgroundColor='#ddd'
      onClick={actions.authentication.logOut}
    >
      <FormattedMessage
        id='agents.logout'
        className={styles.buttonText}
      />
    </FlatButton>
  )
}

export default pipe(
  connectFela(styles)
)(LogOut)
