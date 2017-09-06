import h from 'react-hyperscript'
import { withState, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm, FormSection, FieldArray } from 'redux-form'
import { pipe } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductEditor'
import ResourceTypeEditor from '../../resources/components/ResourceTypeEditor'
import PriceSpecsEditor from '../../supply/components/PriceSpecsEditor'

const ProductEditor = compose(
  connectFela(styles)
)(props => {
  const { styles, product, resourceTypes } = props
  const { resourceType, priceSpecs } = product
  return h('div', {
    className: styles.container
  }, [
    h('div', product.id),
    h(ResourceTypeEditor, { resourceType, resourceTypes }),
    h(PriceSpecsEditor, { resourceType, priceSpecs })
  ])
})

export default ProductEditor
