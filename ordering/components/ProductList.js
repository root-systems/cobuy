import { pipe, map } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'

import ListViewProduct from './ListViewProduct'
import styles from '../styles/ProductList'

function ProductList (props) {
  const { styles, products } = props

  return (
    h('div', {
      className: styles.container
    },
      map((product) => {
        return h(ListViewProduct, {
          product: product
        })
      }, products)
    )
  )
}

export default pipe(
  connectFela(styles)
)(ProductList)
