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
import FontIcon from 'material-ui/FontIcon'
import { compose, withState, withHandlers } from 'recompose'

import GridViewProduct from './GridViewProduct'
import ListViewProduct from './ListViewProduct'
import Hint from '../../app/components/Hint'
import styles from '../styles/ProductsForOrder'

function renderGrid (props) {
  const { styles, products, onNavigate, isListView, setListView, applicablePriceSpecByProduct, collectiveQuantityByProduct } = props

  return h('div', {
    className: styles.gridContainer
  }, [
      values(map((product) => {
        const applicablePriceSpec = applicablePriceSpecByProduct[product.id] || {}
        const collectiveQuantity = collectiveQuantityByProduct[product.id] || 0

        return h(GridViewProduct, {
          product,
          applicablePriceSpec,
          collectiveQuantity,
          key: product.id,
          onNavigate
        })
      }, products))
    ])
}

function renderList (props) {
  const { styles, products, onNavigate, isListView, setListView, applicablePriceSpecByProduct, collectiveQuantityByProduct } = props

  return h(Table, {}, [
    h(TableHeader, { displaySelectAll: false, adjustForCheckbox: false }, [
      h(TableRow, {}, [
        h(TableHeaderColumn, { style: { width: '50px' } }),
        h(TableHeaderColumn, {}, 'name'),
        h(TableHeaderColumn, {}, 'description'),
        h(TableHeaderColumn, { style: { width: '100px' } }, [
          'current price',
          h(Hint, {
            messageId: 'ordering.whatIsCurrentPrice'
          })]),
        h(TableHeaderColumn, { style: { width: '200px' } }, [
          'current quantity',
          h(Hint, {
            messageId: 'ordering.whatIsCurrentQuantity'
          })])
      ])
    ]),
    h(TableBody, {}, [
      values(map((product) => {
        const applicablePriceSpec = applicablePriceSpecByProduct[product.id] || {}
        const collectiveQuantity = collectiveQuantityByProduct[product.id] || 0

        return h(ListViewProduct, {
          product,
          applicablePriceSpec,
          collectiveQuantity,
          key: product.id,
          onNavigate
        })
      }, products))
    ])
  ])
}

function ProductsForOrder (props) {
  const { styles, isListView, setListView } = props

  const listIcon = h(FontIcon, { className: `fa fa-list` })
  const gridIcon = h(FontIcon, { className: `fa fa-th` })
  return (
    h('div', { className: styles.container }, [
      h('div', { className: styles.buttonsContainer }, [
        h(FlatButton, { icon: listIcon, label: 'LIST', onClick: (ev) => setListView(true) }),
        h(FlatButton, { icon: gridIcon, label: 'GRID', onClick: (ev) => setListView(false) })
      ]),
      isListView ? renderList(props) : renderGrid(props)
    ])
  )
}

export default compose(
  connectFela(styles),
  withState('isListView', 'setListView', false),
)(ProductsForOrder)
