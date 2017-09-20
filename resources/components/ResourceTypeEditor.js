import h from 'react-hyperscript'
import { createStructuredSelector } from 'reselect'
import { pipe, values, map, merge, propOr, length, gte } from 'ramda'
import { withState, withHandlers, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, Field, FieldArray } from 'redux-form'
import { not } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ResourceTypeEditor'
import ResourceTypeForm from './ResourceTypeForm'
import ResourceTypeView from './ResourceTypeView'

const ResourceTypeEditor = compose(
  connectFela(styles),
  withState('isEditing', 'setEditing', false),
  withHandlers({
    toggleEdit: ({ setEditing }) => () => setEditing(not)
  })
)(props => {
  const { resourceType = {}, updateResourceType } = props
  console.log(props)
  const { id = 'tmp' } = resourceType
  const nextProps = merge(props, {
    onSubmit: updateResourceType,
    form: `resourceType-${id}`,
    initialValues: resourceType
  })
  if (props.isEditing) {
    return h(ResourceTypeForm, nextProps)
  } else {
    return h(ResourceTypeView, nextProps)
  }
})

export default ResourceTypeEditor
