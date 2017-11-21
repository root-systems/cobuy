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
import FlatButton from 'material-ui/FlatButton'
import { compose, withState, withHandlers } from 'recompose'

import GridViewProduct from './GridViewProduct'
import ListViewProduct from './ListViewProduct'
import styles from '../styles/ProductsForOrder'

function renderGrid (props) {
  const { styles, products, orderIntentsByProductPriceAgent, onNavigate, isListView, setListView } = props
  return h('div', {
    className: styles.gridContainer
  }, [
    values(map((product) => {
      return h(GridViewProduct, {
        product: product,
        key: product.id,
        onNavigate
      })
    }, products))
  ])
}

function renderList (props) {
  const { styles, products, orderIntentsByProductPriceAgent, onNavigate, isListView, setListView } = props

  return h(Table, {}, [
    h(TableHeader, { displaySelectAll: false, adjustForCheckbox: false }, [
      h(TableRow, {}, [
        h(TableHeaderColumn, { style: { width: '50px' } }),
        h(TableHeaderColumn, {}, 'name'),
        h(TableHeaderColumn, {}, 'description'),
        h(TableHeaderColumn, { style: { width: '100px' } }, 'current price'),
        h(TableHeaderColumn, { style: { width: '100px' } }, 'current quantity')
      ])
    ]),
    h(TableBody, {}, [
      values(map((product) => {
        return h(ListViewProduct, {
          product: product,
          orderIntentsByPriceAgent: orderIntentsByProductPriceAgent[product.id] || {},
          key: product.id,
          onNavigate
        })
      }, products))
    ])
  ])
}

function ProductsForOrder (props) {
  const { styles, isListView, setListView } = props

  // TODO: IK: a toggle switch to change between grid view and list view of the products
  // probably using state handlers from recompose, just a local state thang
  return (
    h('div', { className: styles.container }, [
      h('div', { className: styles.buttonsContainer }, [
        h(FlatButton, { onClick: (ev) => setListView(true) }, ['LIST']),
        h(FlatButton, { onClick: (ev) => setListView(false) }, ['GRID'])
      ]),
      isListView ? renderList(props) : renderGrid(props)
    ])
  )
}

export default compose(
  connectFela(styles),
  withState('isListView', 'setListView', true),
)(ProductsForOrder)
