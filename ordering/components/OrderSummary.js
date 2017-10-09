import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import Paper from 'material-ui/Paper'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import { find, propEq } from 'ramda'
import { FormattedMessage } from '../../lib/Intl'
import ProductList from './ProductList'

// import styles from '../styles/ListViewProduct'

function OrderSummary ({ orderSummary }) {
  // const { styles, order } = props
  /*
    Need to know:
      Product summary info - are we storign oders somewhere already?
  */
  console.log('this is: ', find(propEq('id', orderSummary.orderPlans[0].intent.product.priceSpecId))(orderSummary.orderPlans[0].intent.product.priceSpecs))
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
            h(TableHeaderColumn, {}, 'Product Name'),
            h(TableHeaderColumn, {}, 'Name'),
            h(TableHeaderColumn, {}, 'Quanity'),
            h(TableHeaderColumn, {}, 'Item Price'),
            h(TableHeaderColumn, {}, 'Total')
          ])
        ]),
        h(TableBody, { displayRowCheckbox: false }, [
          orderSummary.orderPlans.map((plan) => {
            const price = find(propEq('id', plan.intent.priceSpecId))(plan.intent.product.priceSpecs).price
            return h(TableRow, {}, [
              h(TableRowColumn, {}, plan.intent.product.resourceType.name),
              h(TableRowColumn, {}, plan.intent.agent.profile.name),
              h(TableRowColumn, {}, plan.quantity),
              h(TableRowColumn, {}, find(propEq('id', plan.intent.priceSpecId))(plan.intent.product.priceSpecs).price),
              h(TableRowColumn, {}, (plan.quantity * price))
            ])
          })
        ])
      ])
    ])
  )
}

export default compose(
  // connectFela(styles)
)(OrderSummary)
