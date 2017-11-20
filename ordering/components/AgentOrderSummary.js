import { compose } from 'recompose'
import h from 'react-hyperscript'
import Paper from 'material-ui/Paper'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table'
import { find, propEq, reduce, map, values } from 'ramda'
import { add, mul, round } from 'bigmath'

function PerAgentSummary ({ orderPlans }) {
  const getPriceFromPlan = (plan) => plan.priceSpec.price
  const total = reduce(add, 0, orderPlans.map((plan) => mul(getPriceFromPlan(plan), plan.quantity)))

  return (
    h(Table, {}, [
      h(TableHeader, { displaySelectAll: false }, [
        h(TableRow, {}, [
          h(TableHeaderColumn, {}, orderPlans[0].agent.profile.name)
        ])
      ]),
      h(TableBody, { displayRowCheckbox: false }, [
        orderPlans.map((plan) => {
          const price = getPriceFromPlan(plan)
          return h(TableRow, {}, [
            h(TableRowColumn, { style: { width: '24px' } }, ''),
            h(TableRowColumn, {}, ''),
            h(TableRowColumn, {}, plan.product.resourceType.name),
            h(TableRowColumn, {}, plan.quantity),
            h(TableRowColumn, {}, round(price, 2)),
            h(TableRowColumn, {}, round(mul(plan.quantity, price), 2))
          ])
        })
      ]),
      h(TableFooter, {}, [
        h(TableRow, {}, [
          h(TableRowColumn, {}, ''),
          h(TableRowColumn, {}, ''),
          h(TableRowColumn, {}, ''),
          h(TableRowColumn, {}, 'Total'),
          h(TableRowColumn, {}, round(total, 2))
        ])
      ])
    ])
  )
}

function AgentOrderSummary ({ orderPlans }) {
  const renderAgentOrderSummary = (orderPlans) => {
    return h(PerAgentSummary, { orderPlans }, [])
  }
  const renderOrderPlansByAgent = map(renderAgentOrderSummary)

  return (
    h('div', {}, [
      h(Paper, {
        zDepth: 1
      },
        [
          h('h2', {}, 'Order Summary Per Person')
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
      renderOrderPlansByAgent(values(orderPlans))
    ])
  )
}

export default compose(
)(AgentOrderSummary)
