import h from 'react-hyperscript'
import { isNil, map } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon'

import { getTaskPlanFromOrder } from '../util/orderStatuses'
import ProfileIcon from '../../agents/components/ProfileIcon'
import OrderStep from './OrderStep'

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
  const { id, status, steps, consumerAgent, supplierAgent, adminAgent } = order

  const renderOrderSteps = map(step => {
    return h(OrderStep, { key: step.name, step, styles })
  })

  return (
    h('div', {
      className: styles.container
    }, [
      h('h1', {
        className: styles.title
      }, [
        `order ${id}`
      ]),
      h('div', {
        className: styles.agents
      }, [
        h(OrderAgentIcon, {
          styles,
          className: styles.icon,
          role: 'consumer',
          agent: consumerAgent
        }),
        h(OrderAgentIcon, {
          styles,
          role: 'supplier',
          agent: supplierAgent
        }),
        h(OrderAgentIcon, {
          styles,
          role: 'admin',
          agent: adminAgent
        })
      ]),
      h('ol', {
        className: styles.steps
      }, [
        renderOrderSteps(steps)
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(OrderPage)
