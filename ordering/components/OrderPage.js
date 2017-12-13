import h from 'react-hyperscript'
import { isNil } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'
import ProfileIcon from '../../agents/components/ProfileIcon'

import styles from '../styles/OrderPage'

function OrderAgentIcon (props) {
  const { styles, role, agent } = props
  return (
    h('div', {
      className: styles[role]
    }, [
      role,
      h(ProfileIcon, {
        agent,
        format: 'icon'
      })
    ])
  )
}

function OrderPage (props) {
  const { styles, actions, order } = props

  if (isNil(order)) return null

  return (
    h('div', {
      className: styles.container
    }, [
      h('h1', {
        className: styles.title
      }, [
        `order ${order.id}`
      ]),
      h('div', {
        className: styles.agents
      }, [
        h(OrderAgentIcon, {
          styles,
          role: 'consumer',
          agent: order.consumerAgent
        }),
        h(OrderAgentIcon, {
          styles,
          role: 'supplier',
          agent: order.supplierAgent
        }),
        h(OrderAgentIcon, {
          styles,
          role: 'admin',
          agent: order.adminAgent
        })
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(OrderPage)
