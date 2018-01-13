import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import Paper from 'material-ui/Paper'
import { groupBy, map, pipe, values, isNil } from 'ramda'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table'
import { FormattedMessage } from '../../lib/Intl'

import AgentOrderSummary from './AgentOrderSummary'

function OrderSummary (props) {
  const { currentOrderOrderPlansByAgent, currentOrder } = props

  // all the plans grouped by agent, may be > 1 per agent
  // const groupedAgentPlans = groupBy((plan) => plan.agent.profile.id)(order.orderPlans)
  // const agentPlans = Object.keys(groupedAgentPlans).map((key) => {
  //   return {
  //     agentId: key,
  //     orderPlans: groupedAgentPlans[key]
  //   }
  // })

  const renderAgentOrderSummary = (orderPlans) => {
    return h(AgentOrderSummary, { orderPlans }, [])
  }
  const renderOrderPlansByAgent = map(renderAgentOrderSummary)

  const summaryHeader = isNil(currentOrder.name) ? `Order ${currentOrder.id} Summary` : `Order Summary for ${currentOrder.name}`
  return (
    h('div', {}, [
      h(Paper, {
        zDepth: 1
      },
        [
          h('h2', {}, summaryHeader)
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
