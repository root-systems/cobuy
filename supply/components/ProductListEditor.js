import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { map, partial } from 'ramda'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductListEditor'
import ProductEditor from '../../supply/components/ProductEditor'

import RaisedButton from 'material-ui/RaisedButton'

const ProductListEditor = compose(
  connectFela(styles)
)(props => {
  const { styles, createProduct, products, saveResourceTypeAndPriceSpecs, updateResourceType, savePriceSpecs } = props

  const renderProducts = map(product => {
    return h(ProductEditor, {
      product,
      key: product.id,
      saveResourceTypeAndPriceSpecs,
      updateResourceType,
      savePriceSpecs: partial(savePriceSpecs, [product.id])
    })
  })

  return h('div', {
    className: styles.container
  }, [
    h(RaisedButton, {
      className: styles.addProductButton,
      onClick: () => createProduct()
    }, [
      h(FormattedMessage, {
        id: 'supply.createProduct',
        className: styles.labelText
      })
    ]),
    renderProducts(products)
  ])
})

export default ProductListEditor
