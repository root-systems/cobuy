import { map, values, pipe } from 'ramda'
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

function renderProductsCollection (ItemComponent, props) {
  const {
    styles,
    products,
    onNavigate,
    currentAgent,
    applicablePriceSpecByProduct,
    collectiveQuantityByProduct,
    orderIntentsByProductAgentPrice
  } = props

  return pipe(
    values,
    map((product) => {
      const applicablePriceSpec = applicablePriceSpecByProduct[product.id] || {}
      const collectiveQuantity = collectiveQuantityByProduct[product.id] || 0
      const orderIntentsByAgentPrice = orderIntentsByProductAgentPrice[product.id] || {}

      return h(ItemComponent, {
        key: product.id,
        product,
        onNavigate,
        currentAgent,
        applicablePriceSpec,
        collectiveQuantity,
        orderIntentsByAgentPrice
      })
    })
  )(products)
}

function renderGrid (props) {
  const { styles } = props

  return h('div', {
    className: styles.gridContainer
  }, [
    renderProductsCollection(GridViewProduct, props)
  ])
}

// TODO (mw) rename this to table not list
function renderList (props) {
  const {
    styles
  } = props

  // TODO (mw) the table header code should be co-located with table body code
  return h(Table, {}, [
    h(TableHeader, { displaySelectAll: false, adjustForCheckbox: false }, [
      h(TableRow, {}, [
        h(TableHeaderColumn, { style: { width: '50px' } }),
        h(TableHeaderColumn, {}, 'name'), // TODO (mw) intl
        h(TableHeaderColumn, {}, 'description'), // TODO (mw) intl
        h(TableHeaderColumn, {}, [
          'current price', // TODO (mw) intl
          h(Hint, {
            messageId: 'ordering.whatIsCurrentPrice'
          })
        ]),
        h(TableHeaderColumn, {}, [
          'current group quantity', // TODO (mw) intl
          h(Hint, {
            messageId: 'ordering.whatIsCurrentGroupQuantity'
          })
        ]),
        h(TableHeaderColumn, {}, [
          'your current quantity', // TODO (mw) intl
          h(Hint, {
            messageId: 'ordering.whatIsYourCurrentQuantity'
          })])
      ])
    ]),
    h(TableBody, {}, [
      renderProductsCollection(ListViewProduct, props)
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
  // TODO (mw) this should be a "view" enum string, not a isListView boolean... gross
  withState('isListView', 'setListView', false)
)(ProductsForOrder)
