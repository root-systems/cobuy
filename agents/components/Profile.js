import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { pipe, isNil, not } from 'ramda'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { compose, withState, withHandlers } from 'recompose'
import h from 'react-hyperscript'
import { FormattedMessage } from 'dogstack/intl'

import styles from '../styles/Profile'
import AvatarField from '../../app/components/AvatarField'

function Profile (props) {
  const { styles, isEditing, toggleEdit, updateProfile, handleSubmit, agentType } = props

  const updateProfileAndToggleEdit = (nextProfile) => {
    toggleEdit()
    updateProfile(nextProfile)
  }

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit(updateProfileAndToggleEdit)
  }, [
    h('p', {
      className: styles.intro
    }, [
      h(FormattedMessage, {
        id: 'agents.profile',
        className: styles.labelText,
        values: {
          agentType
        }
      })
    ]),
    h('div', {
      className: styles.innerContainer
    }, [
      h('div', {
        className: styles.avatarContainer
      }, [
        h(Field, {
          name: 'avatar',
          component: AvatarField,
          isEditingProfile: isEditing
        })
      ]),
      h('div', {
        className: styles.infoContainer
      }, [
        h(Field, {
          name: 'name',
          floatingLabelText: (
            h(FormattedMessage, {
              id: 'agents.nameLabel',
              className: styles.labelText
            })
          ),
          component: TextField,
          fullWidth: true,
          disabled: not(isEditing)
        }),
        h(Field, {
          name: 'description',
          floatingLabelText: (
            h(FormattedMessage, {
              id: 'agents.descriptionLabel',
              className: styles.labelText
            })
          ),
          component: TextField,
          fullWidth: true,
          multiLine: true,
          rowsMax: 5,
          disabled: not(isEditing)
        }),
        h(Field, {
          name: 'email',
          floatingLabelText: (
            h(FormattedMessage, {
              id: 'agents.email',
              className: styles.labelText
            })
          ),
          component: TextField,
          fullWidth: true,
          rowsMax: 5,
          disabled: not(isEditing)
        }),
        h(Field, {
          name: 'phone',
          floatingLabelText: (
            h(FormattedMessage, {
              id: 'agents.phoneLabel',
              className: styles.labelText
            })
          ),
          component: TextField,
          fullWidth: true,
          rowsMax: 5,
          disabled: not(isEditing)
        }),
        h(Field, {
          name: 'website',
          floatingLabelText: (
            h(FormattedMessage, {
              id: 'agents.website',
              className: styles.labelText
            })
          ),
          component: TextField,
          fullWidth: true,
          rowsMax: 5,
          disabled: not(isEditing)
        })
      ])
    ]),

    h('div', {
      className: styles.buttonContainer
    }, [
      isEditing
      ? h(RaisedButton, {
        className: styles.button,
        type: 'submit'
      }, [
        h(FormattedMessage, {
          id: 'agents.saveProfile',
          className: styles.labelText
        })
      ])
      : h(RaisedButton, {
        className: styles.button,
        type: 'button',
        onClick: (ev) => {
          // GK: not entirely clear why this is necessary considering the button type, but preventing default anyway
          ev.preventDefault()
          toggleEdit()
        }
      }, [
        h(FormattedMessage, {
          id: 'agents.editProfile',
          className: styles.labelText
        })
      ])
    ])

  ])
}

export default compose(
  connectFela(styles),
  withState('isEditing', 'setEditing', false),
  withHandlers({
    toggleEdit: ({ setEditing }) => () => setEditing(not)
  }),
  connectForm({
    form: 'profile',
    enableReinitialize: true
  })
)(Profile)
