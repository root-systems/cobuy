import { compose } from 'recompose'
import h from 'react-hyperscript'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table'
import { find, propEq, reduce } from 'ramda'
import { add, mul } from 'bigmath'

const getPriceFromPlan = (plan) => find(propEq('id', plan.priceSpecId))(plan.product.priceSpecs).price

function AgentOrderSummary ({ orderPlans, agentId }) {
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
            h(TableRowColumn, {}, price),
            h(TableRowColumn, {}, mul(plan.quantity, price))
          ])
        })
      ]),
      h(TableFooter, {}, [
        h(TableRow, {}, [
          h(TableRowColumn, {}, ''),
          h(TableRowColumn, {}, ''),
          h(TableRowColumn, {}, ''),
          h(TableRowColumn, {}, 'Total'),
          h(TableRowColumn, {}, total)
        ])
      ])
    ])
  )
}

export default compose(
)(AgentOrderSummary)
