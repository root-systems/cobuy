import { compose } from 'recompose'
import { map, values } from 'ramda'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'

import ListViewProduct from './ListViewProduct'
import styles from '../styles/ProductList'

function ProductList (props) {
  const { styles, products } = props

  return (
    h('div', {
      className: styles.container
    }, [
      values(map((product) => {
        return h(ListViewProduct, {
          product: product,
          key: product.id
        })
      }, products))
    ])
  )
}

export default compose(
  connectFela(styles)
)(ProductList)
