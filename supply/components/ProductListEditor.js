import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { map, partial } from 'ramda'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductListEditor'
import ProductEditor from '../../supply/components/ProductEditor'


const ProductListEditor = compose(
  connectFela(styles)
)(props => {
  const { styles, createProduct, products, updateResourceType, savePriceSpecs } = props

  console.log('products', products)

  const renderProducts = map(product => {
    return h(ProductEditor, {
      product,
      key: product.id,
      updateResourceType,
      savePriceSpecs: partial(savePriceSpecs, [product.id])
    })
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
