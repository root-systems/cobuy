import h from 'react-hyperscript'
import { isNil, map } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon'

import { getTaskPlanFromOrder } from '../util/orderStatuses'
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
  const { id, status, steps, consumerAgent, supplierAgent, adminAgent } = order

  const renderOrderStepLinks = map(step => {
    return h(OrderStepLink, { step, styles })
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
      h('h2', {
        className: styles.title
      }, [
        `status: ${status}`,
        renderOrderStepLinks(steps)
      ])
    ])
  )
}

function OrderStepLink ({ step, styles }) {
  const { name, description, icon, taskPlan, completed, ready } = step

  const hasTaskPlan = !isNil(taskPlan)
  const maybeLink = children => {
    return hasTaskPlan
      ? h(Link, { to: `/tasks/${taskPlan.id}` }, children)
      : children
  }

  return (
    h('div', {
      key: name,
    }, maybeLink([
      h(FontIcon, {
        className: icon
      }),
      name,
      description
    ]))
  )
}

export default compose(
  connectFela(styles)
)(OrderPage)
