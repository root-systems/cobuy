import h from 'react-hyperscript'
import { compose, lifecycle } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { isNil, merge, pipe, prop, not, any, all } from 'ramda'
import RaisedButton from 'material-ui/RaisedButton'
import { reduxForm as connectForm, FormSection, FieldArray } from 'redux-form'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductEditor'
import ResourceTypeEditor from '../../resources/components/ResourceTypeEditor'
import PriceSpecsEditor from '../../supply/components/PriceSpecsEditor'

const hasNoId = pipe(prop('id'), isNil)
const hasId = pipe(hasNoId, not)
const anyHaveNoId = any(hasNoId)
const allHaveId = all(hasId)

export default compose(
  connectForm({
    form: 'product',
//    enableReinitialize: true, // to set id on price specs when created
  }),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      const { props } = this

      const { initialValues: product } = props
      const { resourceType, priceSpecs } = product

      const { initialValues: prevProduct } = nextProps
      const { resourceType: prevResourceType, priceSpecs: prevPriceSpecs } = prevProduct

      if (
        (
          (prevResourceType && hasNoId(prevResourceType)) &&
          (resourceType && hasId(resourceType))
        ) ||
        (
          (prevPriceSpecs && anyHaveNoId(prevPriceSpecs)) &&
          (priceSpecs && allHaveId(priceSpecs))
        )
      ) {
        console.log('reeeeeinnininintailzxie')
      }
    }
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
