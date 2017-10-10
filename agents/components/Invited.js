import h from 'react-hyperscript'
import { compose, withState, withHandlers } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage } from 'dogstack/intl'
const { length } = require('@root-systems/redux-form-validators')

import styles from '../styles/Invited'

function Invited (props) {
  const { styles, handleSubmit } = props
  const { jwt } = props.match.params

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit(() => console.log('wefawef'))
  }, [
    h('h2', `You've been invited to Cobuy!`),
    h('div', [
      h('p', 'Enter a new password below'),
      h(Field, {
        name: 'password',
        type: 'password',
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'agents.password',
            className: styles.labelTexta
          })
        ),
        fullWidth: true,
        component: TextField,
        validate: length({ min: 8 })
      }),
      h(RaisedButton, {
        className: styles.button,
        type: 'submit'
      }, [
        h(FormattedMessage, {
          id: 'agents.saveInvitedPassword',
          className: styles.labelText
        })
      ])
    ])
  ])
}

export default compose(
  connectFela(styles),
  connectForm({
    form: 'invited',
    enableReinitialize: true
  })
)(Invited)
