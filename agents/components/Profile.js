import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { pipe, isNil, not, map, isEmpty } from 'ramda'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { compose, withState, withHandlers } from 'recompose'
import h from 'react-hyperscript'
import { FormattedMessage } from 'dogstack/intl'
import { required, email } from '@root-systems/redux-form-validators'
import { Link } from 'react-router-dom'

import styles from '../styles/Profile'
import AvatarField from '../../app/components/AvatarField'
import MemberInvites from './MemberInvites'

const iconByAgentType = {
  my: 'user',
  group: 'users',
  supplier: 'shopping-cart'
}

function Profile (props) {
  const {
    styles,
    isEditing,
    updateProfile,
    removeMember,
    createMembers,
    handleSubmit,
    agentType,
    agent = {},
    currentAgentGroupProfiles = [],
    resourceTypes = []
  } = props
  const { members = [] } = agent
  const saveProfile = (nextProfile) => {
    updateProfile(nextProfile)
  }

  const isSupplierProfile = agentType === 'supplier'
  const isMyProfile = agentType === 'my'
  const isBuyingGroupProfile = agentType === 'group'

  const renderMyMembers = () => {
    if (isEmpty(members)) return null
    return h('div', { className: styles.myGroupsContainer },
      h(MemberInvites, {
        agent: agent,
        initialValues: {
          members
        },
        removeMember: removeMember,
        createMembers: createMembers
      })
    )
  }

  const renderMyResourceTypes = () => {
    if (isEmpty(resourceTypes)) return null
    return h('div', { className: styles.myGroupsContainer }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'agents.myResourceTypes',
          className: styles.labelText
        })
      ]),
      h('ul', renderResourceTypeList())
    ])
  }

  const renderResourceTypeList = () => {
    return map(renderResourceType, resourceTypes)
  }

  const renderResourceType = (resourceType) => {
    return h('li', resourceType.name)
  }

  const renderMyGroups = () => {
    if (isEmpty(currentAgentGroupProfiles)) return null
    return h('div', { className: styles.myGroupsContainer }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'agents.myGroups',
          className: styles.labelText
        })
      ]),
      h('ul', renderCurrentAgentGroupProfiles())
    ])
  }

  const renderCurrentAgentGroupProfiles = () => {
    return map(renderCurrentAgentGroupProfile, currentAgentGroupProfiles)
  }

  const renderCurrentAgentGroupProfile = (profile) => {
    return h(Link, {
      className: styles.link,
      to: `/p/${profile.id}`
    }, [
      h('li', profile.name)
    ])
  }

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
      ]),
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
    ]),
    isMyProfile ? renderMyGroups() : null,
    isSupplierProfile ? renderMyResourceTypes() : null,
    isBuyingGroupProfile ? renderMyMembers() : null
  ])
}

export default compose(
  connectFela(styles),
  connectForm({
    form: 'profile',
    enableReinitialize: true
  })
)(Profile)
