import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { isNil } from 'ramda'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductEditor'
import ResourceTypeEditor from '../../resources/components/ResourceTypeEditor'
import PriceSpecsEditor from '../../supply/components/PriceSpecsEditor'

const ProductEditor = compose(
  connectFela(styles)
)(props => {
  const { styles, product, updateResourceType, savePriceSpecs } = props
  const { resourceType, priceSpecs } = product
  console.log(product, 'products')

  // ResourceTypeEditor and PriceSpecsEditor can't handle
  // not having a resourceType, so don't render without one.
  // this happens temporarily when a new product is created.
  if (isNil(resourceType)) return null

  if (resourceType.name) {
    return h('div', {
      className: styles.container
    }, [
      h('img', {src: resourceType.image }),
      h('div', resourceType.name),
      h(ResourceTypeEditor, {
        resourceType,
        updateResourceType,
        priceSpecs,
        savePriceSpecs
      })
    ])
  } else {
    return h('div', {
      className: styles.container
    }, [
      h('img', {src: resourceType.image }),
      h('div', 'unamed product'),
      h(ResourceTypeEditor, {
        resourceType,
        updateResourceType,
        priceSpecs,
        savePriceSpecs
      })
    ])
  }
})

export default ProductEditor
