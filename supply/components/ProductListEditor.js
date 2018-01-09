import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { isNil, map } from 'ramda'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Divider from 'material-ui/Divider'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductListEditor'
import ProductEditor from '../../supply/components/ProductEditor'


const ProductListEditor = compose(
  connectFela(styles)
)(props => {
  const { styles, createProduct, products, saveProduct } = props

  const renderProducts = map(product => {
    if (isNil(product)) return null

    return [
      h(ProductEditor, {
        product,
        key: product.id,
        form: `product-${product.id}`,
        initialValues: product,
        onSubmit: saveProduct
      }),
      h(Divider)
    ]
  })

  return h('div', {
    className: styles.container
  }, [
    renderProducts(products),
    h(FloatingActionButton, {
      className: styles.addProductButton,
      onClick: () => createProduct()
    }, [
      h(ContentAdd)
    ])
  ])
})

export default ProductListEditor
