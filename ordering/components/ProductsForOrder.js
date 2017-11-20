import { compose } from 'recompose'
import { map, values } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'

import GridViewProduct from './GridViewProduct'
import styles from '../styles/ProductsForOrder'

function ProductsForOrder (props) {
  const { styles, products, onNavigate } = props

  return (
    h('div', {
      className: styles.container
    }, [
      values(map((product) => {
        return h(GridViewProduct, {
          product: product,
          key: product.id,
          onNavigate
        })
      }, products))
    ])
  )
}

export default compose(
  connectFela(styles)
)(ProductsForOrder)
