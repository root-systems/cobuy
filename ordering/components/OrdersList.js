import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import { pipe, isNil, map, values, path } from 'ramda'
import { FormattedMessage } from 'dogstack/intl'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'

import Hint from '../../app/components/Hint'
import Avatar from '../../agents/components/Avatar'
import OrderSteps from './OrderSteps'

import styles from '../styles/OrdersList'

// TODO (mw) share code with OrderPage

const iconByRole = {
  admin: 'user',
  consumer: 'users',
  supplier: 'shopping-cart'
}

function OrderAgentIcon (props) {
  const { styles, role, agent } = props
  return (
    h('div', {
      className: styles[role]
    }, [
      h(Avatar, {
        agent,
        size: 'small',
        icon: iconByRole[role]
      })
    ])
  )
}

function OrdersListItem (props) {
  const { styles, actions, order } = props

  if (isNil(order)) return null
  const { steps, stepIndex } = order

  return h(Link, {
    className: styles.link,
    to: `/o/${order.id}`
  }, [
    h('li', {
      className: styles.item,
    }, [
      h('header', {
        className: styles.header
      }, [
        h('p', {
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
      ]),
      h(OrderSteps, {
        steps,
        stepIndex,
        orientation: 'horizontal',
        isStatic: true
      }),
      h(Divider)
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
          id: 'ordering.yourOrders',
          className: styles.labelText
        }),
        h(Hint, {
          messageId: 'ordering.whatIsAnOrder',
          position: 'top-right',
          iconSize: '24px'
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
