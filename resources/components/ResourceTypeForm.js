import h from 'react-hyperscript'
import { createStructuredSelector } from 'reselect'
import { pipe, values, map, merge, propOr, length, gte, not} from 'ramda'
import { withState, withHandlers, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ResourceTypeEditor'
import PriceSpecsEditor from '../../supply/components/PriceSpecsEditor'

const ResourceTypeForm = compose(
  connectForm({})
)(props => {
  const { styles, toggleEdit, updateResourceType, handleSubmit, resourceType, priceSpecs, savePriceSpecs } = props

  const updateResourceAndToggleEdit = (nextResource) => {
    toggleEdit()
    updateResourceType(nextResource)
  }

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit(updateResourceAndToggleEdit)
  }, [
    h('p', {
      className: styles.resourceHeader
    }, [
      h(FormattedMessage, {
        id: 'resources.resourceTypes',
        className: styles.labelText
      })
    ]),
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

    h('div', {
      className: styles.buttonContainer
    }, [

       h(RaisedButton, {
        className: styles.submitButton,
        type: 'submit'
      }, [
        h(FormattedMessage, {
          id: 'resources.saveResourceType',
          className: styles.labelText
        })
      ])
    ]),
    h(PriceSpecsEditor, { resourceType, priceSpecs, savePriceSpecs })
  ])
})
export default ResourceTypeForm
