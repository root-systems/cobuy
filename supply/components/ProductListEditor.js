import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { map, partial } from 'ramda'

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
    h('button', {
      onClick: () => createProduct()
    }, [
      h(FormattedMessage, {
        id: 'resources.createProduct',
        className: styles.labelText
      })
    ]),
    renderProducts(products)
  ])
})

export default ProductListEditor
