import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { connect as connectFela } from 'react-fela'
import { flow } from 'lodash'

import styles from '../styles/LogOut'

function LogOut (props) {
  const { styles } = props
  return (
    <FlatButton
      className={styles.container}
      backgroundColor='#ddd'
    >
      Log Out
    </FlatButton>
  )
}

export default flow(
  connectFela(styles)
)(LogOut)
