import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { reduxForm as connectForm, Field } from 'redux-form'
import { } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage } from 'dogstack/intl'

import styles from '../styles/ResourceTypeEditor'

export default compose(
  connectFela(styles)
)(function ResourceTypeEditor (props)  {
  const { styles } = props

  return h('div', {
    className: styles.container
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
    })
  ])
})
