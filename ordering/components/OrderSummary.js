import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import Paper from 'material-ui/Paper'
import { groupBy, map } from 'ramda'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table'
import { FormattedMessage } from '../../lib/Intl'

import AgentOrderSummary from './AgentOrderSummary'

function OrderSummary ({ order }) {
  // const { styles, order } = props
  const groupedAgentPlans = groupBy((plan) => plan.agent.profile.id)(order.orderPlans)
  const agentPlans = Object.keys(groupedAgentPlans).map((key) => {
    return {
      agentId: key,
      orderPlans: groupedAgentPlans[key]
    }
  })

  return (
    h('div', {}, [
      h(Paper, {
        zDepth: 2
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
      agentPlans.map((plan) => {
        const { orderPlans, agentId } = plan
        return h(AgentOrderSummary, { orderPlans, agentId }, [])
      })
    ])
  )
}

export default compose(
  // connectFela(styles)
)(OrderSummary)
