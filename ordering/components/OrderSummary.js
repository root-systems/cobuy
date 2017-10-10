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

function OrderSummary({ orderSummary }) {
  // const { styles, order } = props
  /*
    Could add a new header row for every new agent?
    How would the data be orginised? Using gettings to malipulate the data with different props/filters for different groupings
  */
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
      orderSummary.agentOrderPlans.map((agentPlan) => {
        return h(Table, {}, [
          h(TableHeader, { displaySelectAll: false }, [
            h(TableRow, {}, [
              h(TableHeaderColumn, {}, agentPlan.agent.profile.name)
            ])
          ]),
          h(TableBody, { displayRowCheckbox: false }, [
            agentPlan.orderPlans.map((plan) => {
              const price = find(propEq('id', plan.intent.priceSpecId))(plan.intent.product.priceSpecs).price
              return h(TableRow, {}, [
                h(TableRowColumn, {}, ''),
                h(TableRowColumn, {}, plan.intent.product.resourceType.name),
                h(TableRowColumn, {}, plan.quantity),
                h(TableRowColumn, {}, find(propEq('id', plan.intent.priceSpecId))(plan.intent.product.priceSpecs).price),
                h(TableRowColumn, {}, (plan.quantity * price))
              ])
            })
          ])
        ])
      })
    ])
  )
}

export default compose(
  // connectFela(styles)
)(OrderSummary)
