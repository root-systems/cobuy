import h from 'react-hyperscript'
import { createStructuredSelector } from 'reselect'
import { pipe, values, map, merge, propOr, length, gte, __ } from 'ramda'
import { withState, withHandlers, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, Field, FieldArray } from 'redux-form'
import { not } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { FormattedMessage } from 'dogstack/intl'

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
  connectForm({}),
  withState('isEditing', 'setEditing', false),
  withHandlers({
    toggleEdit: ({ setEditing }) => () => setEditing(not)
  })
)(props => {
  const { styles, isEditing, toggleEdit, updateResourceType, handleSubmit } = props

  const updateResourceAndToggleEdit = (nextResource) => {
    toggleEdit()
    updateResourceType(nextResource)
  }

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit(updateResourceAndToggleEdit)
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
