import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { pipe, isNil, not } from 'ramda'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { compose, withState, withHandlers } from 'recompose'
import h from 'react-hyperscript'
import { FormattedMessage } from 'dogstack/intl'
import { required, email } from '@root-systems/redux-form-validators'

import styles from '../styles/Profile'
import AvatarField from '../../app/components/AvatarField'

const iconByAgentType = {
  my: 'user',
  group: 'users',
  supplier: 'shopping-cart'
}

function Profile (props) {
  const { styles, isEditing, updateProfile, handleSubmit, agentType, agent } = props

  const saveProfile = (nextProfile) => {
    updateProfile(nextProfile)
  }

  const isSupplierProfile = agentType === 'supplier'

  return h('form', {
    className: styles.container,
    onSubmit: handleSubmit(saveProfile)
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
          isEditingProfile: isEditing,
          agent: agent,
          icon: iconByAgentType[agentType]
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
          disabled: not(isEditing),
          validate: required()
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
          disabled: not(isEditing),
          validate: [required(), email()]
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
          disabled: not(isEditing)
        }),
        h(Field, {
          name: 'address',
          floatingLabelText: (
            h(FormattedMessage, {
              id: 'agents.address',
              className: styles.labelText
            })
          ),
          component: TextField,
          fullWidth: true,
          multiLine: true,
          rowsMax: 5,
          disabled: not(isEditing),
          validate: isSupplierProfile ? [required()] : null
        })
      ])
    ]),

    h('div', {
      className: styles.buttonContainer
    }, [
      isEditing
      ? h(RaisedButton, {
        className: styles.button,
        type: 'submit',
        primary: true
      }, [
        h(FormattedMessage, {
          id: 'agents.saveProfile',
          className: styles.buttonText
        })
      ])
         : null
    ])

  ])
}

export default compose(
  connectFela(styles),
  connectForm({
    form: 'profile',
    enableReinitialize: true
  })
)(Profile)
