import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import Paper from 'material-ui/Paper'
import { groupBy, map, pipe, prop, reduce, merge, values, find, propEq } from 'ramda'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableBody,
  TableFooter
} from 'material-ui/Table'
import { add, mul, round } from 'bigmath'

const summariseOrder = pipe(
  groupBy(
    prop('productId')
  ),
  map(reduce((soFar, orderPlan) => {
    const { product, priceSpecId, quantity } = orderPlan

    if (soFar === null) {
      return {
        product,
        priceSpecId,
        quantity
      }
    }
    return merge(soFar, {
      quantity: add(quantity, soFar.quantity)
    })
  }, null)),
  values
)

const getPriceFromPlan = (plan) => find(propEq('id', plan.priceSpecId))(plan.product.priceSpecs).price

function SupplierOrderSummary ({ order, orderPlans }) {
  // const summarisedOrder = summariseOrder(order.orderPlans)
  const orderTotal = reduce(add, 0, orderPlans.map((plan) => mul(getPriceFromPlan(plan), plan.quantity)))
  const groupProfile = order.consumerAgent.profile
  const supplier = order.supplierAgent.profile

  return (
    h('div', {}, [
      h(Paper, {
        zDepth: 1
      },
        [
          h('h2', {}, 'Supplier Order Summary')
        ]),
      h('div', {}, [
        h('h3', {}, 'To:'),
        h('h4', {}, supplier.name),
        h('p', {}, supplier.address)
      ]),
      h('div', {}, [
        h('h3', {}, 'From:'),
        h('h4', {}, groupProfile.name),
        h('p', {}, groupProfile.address)
      ]),
      h(Table, {}, [
        h(TableHeader, { displaySelectAll: false }, [
          h(TableRow, {}, [
            h(TableHeaderColumn, {}, 'Product Name'),
            h(TableHeaderColumn, {}, 'Quantity'),
            h(TableHeaderColumn, {}, 'Item Price'),
            h(TableHeaderColumn, {}, 'Total')
          ])
        ]),
        h(TableBody, { displayRowCheckbox: false }, [
          orderPlans.map((plan) => {
            const { product, quantity } = plan
            const price = getPriceFromPlan(plan)
            return h(TableRow, {}, [
              h(TableRowColumn, { style: { width: '24px' } }, ''),
              h(TableRowColumn, {}, product.resourceType.name),
              h(TableRowColumn, {}, quantity),
              h(TableRowColumn, {}, price),
              h(TableRowColumn, {}, round(mul(plan.quantity, price), 2))
            ])
          })
        ]),
        h(TableFooter, {}, [
          h(TableRow, {}, [
            h(TableRowColumn, {}, ''),
            h(TableRowColumn, {}, ''),
            h(TableRowColumn, {}, 'GST'),
            // Temp for demo until #191 has been worked on
            h(TableRowColumn, {}, round(mul(orderTotal, 0.15), 2))
          ]),
          h(TableRow, {}, [
            h(TableRowColumn, {}, ''),
            h(TableRowColumn, {}, ''),
            h(TableRowColumn, {}, 'Total'),
            h(TableRowColumn, {}, round(orderTotal, 2))
          ])
        ])
      ])
    ])
  )
}

export default compose(
  // connectFela(styles)
)(SupplierOrderSummary)
