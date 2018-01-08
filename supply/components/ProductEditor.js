import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { isNil, merge } from 'ramda'
import RaisedButton from 'material-ui/RaisedButton'
import { reduxForm as connectForm, FormSection, FieldArray } from 'redux-form'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductEditor'
import ResourceTypeEditor from '../../resources/components/ResourceTypeEditor'
import PriceSpecsEditor from '../../supply/components/PriceSpecsEditor'

export default compose(
  connectForm({
    form: 'product',
//    enableReinitialize: true, // to set id on price specs when created
  }),
  connectFela(styles)
)(function ProductEditor (props) {
  const { styles, product, handleSubmit } = props
  const { resourceType, priceSpecs } = product

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit
  }, [
    h(FormSection, {
      name: 'resourceType'
    }, [
      h(ResourceTypeEditor),
    ]),
    h(FieldArray, {
      name: 'priceSpecs',
      component: PriceSpecsEditor
    }),
    h(RaisedButton, {
      type: 'submit'
    }, [
      'SAVE'
    ])
  ])
})
