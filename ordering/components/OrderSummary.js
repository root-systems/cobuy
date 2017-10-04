import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'
import Paper from 'material-ui/Paper'
import { FormattedMessage } from '../../lib/Intl'
import ProductList from './ProductList'

// import styles from '../styles/ListViewProduct'

function OrderSummary (props) {
  // const { styles, order } = props
/*
  Need to know:
    Product summary info - are we storign oders somewhere already?
*/
  return (
    h('div', {}, [
      h(Paper, {
        zDepth: 2
      },
        [
          h('h2', {}, 'Order Summary')
        ]),
      h(ProductList, { products: props.order.products }, [])
    ])
  )
}

export default compose(
  // connectFela(styles)
)(OrderSummary)
