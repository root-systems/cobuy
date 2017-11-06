import h from 'react-hyperscript'
import { withState, withHandlers, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, Field, FieldArray } from 'redux-form'
import { isNil } from 'ramda'
import { pipe, values, map, merge, propOr, length, gte, __, not } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductEditor'
import ResourceTypeEditor from '../../resources/components/ResourceTypeEditor'
import PriceSpecsEditor from '../../supply/components/PriceSpecsEditor'

import PriceSpec from './PriceSpec'

// const ProductEditor = compose(
//   connectFela(styles)
// )(props => {
//   const { styles, product, saveResourceTypeAndPriceSpecs, updateResourceType, savePriceSpecs } = props
//   const { resourceType, priceSpecs } = product
//
//   // ResourceTypeEditor and PriceSpecsEditor can't handle
//   // not having a resourceType, so don't render without one.
//   // this happens temporarily when a new product is created.
//   if (isNil(resourceType)) return null
//
//   return h('div', {
//     className: styles.container
//   }, [
//     h(ResourceTypeEditor, { resourceType, updateResourceType }),
//     h(PriceSpecsEditor, { resourceType, priceSpecs, savePriceSpecs })
//   ])
// })
//
// export default ProductEditor


const ProductEditor = compose(
  connectFela(styles)
)(props => {
  const { saveResourceTypeAndPriceSpecs, product } = props
  const { resourceType, priceSpecs } = product

  // ResourceTypeEditor and PriceSpecsEditor can't handle
  // not having a resourceType, so don't render without one.
  // this happens temporarily when a new product is created.
  if (isNil(resourceType)) return null

  const { id = 'tmp' } = resourceType
  const nextProps = merge(props, {
    onSubmit: saveResourceTypeAndPriceSpecs,
    form: `product-${product.id}`,
    initialValues: merge(resourceType, priceSpecs)
  })
  return h(ProductForm, nextProps)
})

export default ProductEditor

const ProductForm = compose(
  connectForm({}),
  withState('isEditing', 'setEditing', false),
  withHandlers({
    toggleEdit: ({ setEditing }) => () => setEditing(not)
  })
)(props => {
  const { styles, isEditing, toggleEdit, product, saveResourceTypeAndPriceSpecs, handleSubmit } = props
  console.log(props)
  const { resourceType, priceSpecs } = product

  const saveResourceTypeAndPriceSpecsAndToggleEdit = (nextResource) => {
    toggleEdit()
    saveResourceTypeAndPriceSpecs(nextResource)
  }

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit(saveResourceTypeAndPriceSpecsAndToggleEdit)
  }, [
    h('div', { className: styles.resourceTypeDetails }, [
      h(Field, {
        name: 'name',
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'resources.resourceTypeName',
            className: styles.labelText
          })
        ),
        component: TextField,
        disabled: not(isEditing)
      }),
      h(Field, {
        name: 'description',
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'resources.resourceTypeDescription',
            className: styles.labelText
          })
        ),
        component: TextField
      }),
      h(Field, {
        name: 'image',
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'resources.resourceTypeImage',
            className: styles.labelText
          })
        ),
        component: TextField,
        disabled: not(isEditing)
      }),
    ]),
    h('div', { className: styles.priceSpecsDetails }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'supply.priceSpecs',
          className: styles.labelText
        })
      ]),
      h(FieldArray, {
        name: 'priceSpecs',
        component: PriceSpecs,
        styles,
        resourceType,
        isEditing
      }),
    ]),
    h('div', {
      className: styles.buttonContainer
    }, [
      isEditing
      ? h(RaisedButton, {
        className: styles.submitButton,
        type: 'submit'
      }, [
        h(FormattedMessage, {
          id: 'resources.saveResourceType',
          className: styles.labelText
        })
      ])
      : h(RaisedButton, {
        className: styles.submitButton,
        type: 'button',
        onClick: (ev) => {
          // GK: not entirely clear why this is necessary considering the button type, but preventing default anyway
          ev.preventDefault()
          toggleEdit()
        }
      }, [
        h(FormattedMessage, {
          id: 'resources.editResource',
          className: styles.labelText
        })
      ])
    ])
  ])
})

const PriceSpecs = (props) => {
  const { styles, resourceType, fields, isEditing } = props
  return (
    h('div', {
      className: styles.priceSpecsContainer
    }, [
      fields.map((field, index) => (
        h(PriceSpec, {
          key: index,
          field,
          removeField: () => fields.remove(index),
          styles,
          resourceType
        })
      )),
      isEditing
      ? h(RaisedButton, {
        type: 'button',
        className: styles.addPriceSpecButton,
        onClick: () => fields.push({})
      }, [
        h(FormattedMessage, {
          id: 'supply.addPriceSpec',
          className: styles.buttonText
        })
      ])
      : null
    ])
  )
}
