import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import Paper from 'material-ui/Paper'
import { groupBy, map, pipe, values } from 'ramda'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table'
import { FormattedMessage } from '../../lib/Intl'

import AgentOrderSummary from './AgentOrderSummary'
import SupplierOrderSummary from './SupplierOrderSummary'

function OrderSummary (props) {
  const { currentOrder, summedOrderPlansPerProduct, currentOrderOrderPlansByAgent } = props
  console.log(props)

  // all the plans grouped by agent, may be > 1 per agent
  // const groupedAgentPlans = groupBy((plan) => plan.agent.profile.id)(order.orderPlans)
  // const agentPlans = Object.keys(groupedAgentPlans).map((key) => {
  //   return {
  //     agentId: key,
  //     orderPlans: groupedAgentPlans[key]
  //   }
  // })

  return h('div', [
    // h(AgentOrderSummary, { orderPlans: currentOrderOrderPlansByAgent }),
    h(SupplierOrderSummary, {
      order: currentOrder,
      orderPlans: summedOrderPlansPerProduct
    }),
  ])

  const renderAgentOrderSummary = (orderPlans) => {
    return h(AgentOrderSummary, { orderPlans }, [])
  }
  const renderOrderPlansByAgent = map(renderAgentOrderSummary)

  return (
    h('div', {}, [
      h(Paper, {
        zDepth: 1
      },
        [
          h('h2', {}, 'Order Summary')
        ]),
      h(Table, {}, [
        h(TableHeader, { displaySelectAll: false }, [
          h(TableRow, {}, [
            h(TableHeaderColumn, {}, ''),
            h(TableHeaderColumn, {}, 'Product Name'),
            h(TableHeaderColumn, {}, 'Quantity'),
            h(TableHeaderColumn, {}, 'Item Price'),
            h(TableHeaderColumn, {}, 'Total')
          ])
        ])
      ]),
      renderOrderPlansByAgent(values(currentOrderOrderPlansByAgent))
    ])
  )
}

export default compose(
  // connectFela(styles)
)(OrderSummary)
