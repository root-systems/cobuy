import h from 'react-hyperscript'
import { isNil, map } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon'
import { Stepper } from 'material-ui/Stepper'

import { getTaskPlanFromOrder } from '../util/orderStatuses'
import ProfileIcon from '../../agents/components/ProfileIcon'
import OrderSteps from './OrderSteps'

import styles from '../styles/OrderPage'

function OrderAgentIcon (props) {
  const { styles, role, agent } = props
  return (
    h('div', {
      className: `${styles.agent} ${styles[role]}`
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
  const { id, steps, stepIndex, consumerAgent, supplierAgent, adminAgent } = order

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
