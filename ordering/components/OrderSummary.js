import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import Paper from 'material-ui/Paper'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table'
import { FormattedMessage } from '../../lib/Intl'

import AgentOrderSummary from './AgentOrderSummary'

function OrderSummary ({ agentOrderPlans }) {
  // const { styles, order } = props
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
            h(TableHeaderColumn, {}, 'Quanity'),
            h(TableHeaderColumn, {}, 'Item Price'),
            h(TableHeaderColumn, {}, 'Total')
          ])
        ])]),
      agentOrderPlans.map((agentPlan) => {
        const { orderPlans, agent } = agentPlan
        return h(AgentOrderSummary, { orderPlans, agent }, [])
      })
    ])
  )
}

export default compose(
  // connectFela(styles)
)(OrderSummary)
