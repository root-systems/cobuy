import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import { pipe, map, values, path } from 'ramda'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage } from 'dogstack/intl'
import { Link } from 'react-router-dom'
import ProfileIcon from '../../agents/components/ProfileIcon'

import styles from '../styles/OrdersList'

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

function OrdersListItem (props) {
  const { styles, actions, order } = props

  return h(Link, {
    to: `/o/${order.id}`
  }, [
    h('li', {
      className: 'item',
    }, [
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
  ])
}

function OrdersList (props) {
  const { styles, actions, orders } = props

  const renderOrdersListItems = pipe(
    values,
    map(order => {
      return h(OrdersListItem, {
        key: order.id,
        styles,
        actions,
        order
      })
    })
  )

  return (
    h('div', {
      className: styles.container
    }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'app.dashboard.orders',
          className: styles.labelText
        })
      ]),
      h('ul', {
        className: styles.list
      }, [
        renderOrdersListItems(orders)
      ])
    ])
  )
}

export default pipe(
  connectFela(styles)
)(OrdersList)
