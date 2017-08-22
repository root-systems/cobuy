import h from 'react-hyperscript'
import { isNil } from 'ramda'

import styles from '../styles/CastIntentTask'

export default (props) => {
  const { actions, currentAgent } = props

  if(isNil(currentAgent)) {
    return null
  }

  return (
    h('div', {
      className: styles.container
    },
      'hello i am a string'
    )
  )
}
