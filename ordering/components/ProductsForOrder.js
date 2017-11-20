import { map, values } from 'ramda'
import { connect as connectFela } from 'react-fela'
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
import { compose, withState, withHandlers } from 'recompose'

import GridViewProduct from './GridViewProduct'
import ListViewProduct from './ListViewProduct'
import styles from '../styles/ProductsForOrder'

function ProductsForOrder (props) {
  const { styles, products, orderIntentsByProductPriceAgent, onNavigate, isListView, setListView } = props
  console.log(props)

  // TODO: IK: a toggle switch to change between grid view and list view of the products
  // probably using state handlers from recompose, just a local state thang
  return (
    h(Table, {}, [
      h(TableHeader, { displaySelectAll: false }, [
        h(TableRow, {}, [
          h(TableHeaderColumn, { style: { width: '50px' } }),
          h(TableHeaderColumn, {}, 'name'),
          h(TableHeaderColumn, {}, 'description'),
          h(TableHeaderColumn, { style: { width: '100px' } }, 'current price'),
          h(TableHeaderColumn, {}, 'current quantity'),
          h(TableHeaderColumn, {}),
        ])
      ]),
      h(TableBody, {}, [
        values(map((product) => {
          return h(ListViewProduct, {
            product: product,
            key: product.id,
            onNavigate
          })
        }, products))
      ])
    ])
  )
}

export default compose(
  connectFela(styles),
  withState('isListView', 'setListView', true),
)(ProductsForOrder)

// h('div', {
//   className: styles.container
// }, [
//   values(map((product) => {
//     return h(ListViewProduct, {
//       product: product,
//       key: product.id,
//       onNavigate
//     })
//   }, products))
// ])
