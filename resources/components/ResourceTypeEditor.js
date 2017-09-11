import h from 'react-hyperscript'
import { createStructuredSelector } from 'reselect'
import { pipe, values, map, merge, propOr, length, gte, __ } from 'ramda'
import { withState, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, Field, FieldArray } from 'redux-form'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ResourceTypeEditor'

const ResourceTypeEditor = compose(
  connectFela(styles)
)(props => {
  const { resourceType = {}, updateResourceType } = props
  const { id = 'tmp' } = resourceType
  const nextProps = merge(props, {
    onSubmit: updateResourceType,
    form: `resourceType-${id}`,
    initialValues: resourceType
  })
  return h(ResourceTypeForm, nextProps)
})

export default ResourceTypeEditor

const ResourceTypeForm = compose(
  connectForm({})
)(props => {
  const { styles, handleSubmit } = props

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit
  }, [
    h(Field, {
      name: 'name',
      floatingLabelText: (
        h(FormattedMessage, {
          id: 'resources.resourceTypeName',
          className: styles.labelText
        })
      ),
      component: TextField
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
      component: TextField
    }),
    h(RaisedButton, {
      type: 'submit',
      className: styles.submitButton
    }, [
      h(FormattedMessage, {
        id: 'resources.saveResourceType',
        className: styles.buttonText
      })
    ])
  ])
})
