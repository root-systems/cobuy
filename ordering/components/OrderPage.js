import h from 'react-hyperscript'
import { isNil } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'

import styles from '../styles/OrderPage'

function OrderPage (props) {
  const { styles, actions, order } = props

  if (isNil(order)) return null

  return (
    h('div', {
      className: styles.container
    }, [
      order.id
    ])
  )
}

export default compose(
  connectFela(styles)
)(OrderPage)
