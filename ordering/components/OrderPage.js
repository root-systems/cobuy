import h from 'react-hyperscript'
import { isNil, map, either } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon'
import { Stepper } from 'material-ui/Stepper'

import { getTaskPlanFromOrder } from '../util/orderStatuses'
import Avatar from '../../agents/components/Avatar'
import OrderSteps from './OrderSteps'
import Hint from '../../app/components/Hint'

import styles from '../styles/OrderPage'

// TODO (mw) share code with OrdersList

const iconByRole = {
  admin: 'user',
  consumer: 'users',
  supplier: 'shopping-cart'
}

function OrderAgentIcon (props) {
  const { styles, role, agent, roleIntlId } = props
  // const { profile } = agent
  console.log('agent', agent)
  return (
    h('div', {
      className: `${styles.agent} ${styles[role]}`
    }, [
      h(FormattedMessage, {
        id: roleIntlId,
        className: styles.labelText
      }),
      h(Avatar, {
        agent,
        size: 'medium',
        icon: iconByRole[role]
      }),
      // h('p', either(isNil(agent), isNil(profile)) ? null : profile.name)
    ])
  )
}

function OrderPage (props) {
  const { styles, actions, order } = props

  if (isNil(order)) return null
  const { id, steps, stepIndex, consumerAgent, supplierAgent, adminAgent } = order

  return (
    h('div', {
      className: styles.container
    }, [
      h('h1', {
        className: styles.title
      }, [
        isNil(order.name) ? `Order ${order.id}` : order.name,
        h(Hint, {
          messageId: 'ordering.whatIsAnOrder',
          position: 'top-right',
          iconSize: '24px'
        })
      ]),
      h('div', {
        className: styles.agents
      }, [
        h(OrderAgentIcon, {
          styles,
          className: styles.icon,
          role: 'consumer',
          roleIntlId: 'ordering.consumer',
          agent: consumerAgent
        }),
        h(OrderAgentIcon, {
          styles,
          role: 'supplier',
          roleIntlId: 'ordering.supplier',
          agent: supplierAgent
        }),
        h(OrderAgentIcon, {
          styles,
          role: 'admin',
          roleIntlId: 'ordering.admin',
          agent: adminAgent
        })
      ]),
      h(OrderSteps, {
        steps,
        stepIndex,
        orientation: 'vertical',
        isStatic: false,
        onNavigate: actions.router.push
      })
    ])
  )
}

export default compose(
  connectFela(styles)
)(OrderPage)
