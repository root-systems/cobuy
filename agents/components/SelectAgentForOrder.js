import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { pipe, isNil, not, map, isArrayLike } from 'ramda'
import { SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { compose, withState, withHandlers } from 'recompose'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/SelectAgentForOrder'
import AvatarField from '../../app/components/AvatarField'

function SelectAgentForOrder (props) {
  const { styles, isEditing, toggleEdit, selectAgent, handleSubmit, agentCollection } = props

  return h('form', {
    className: styles.container
  }, [
    h('p', {
      className: styles.intro
    }, [
      h(FormattedMessage, {
        id: 'agents.profile',
        className: styles.labelText
      })
    ]),
    h('div', {
      className: styles.innerContainer
    }, [
      h(Field, {
        name: 'description',
        floatingLabelText: 'test',
        // floatingLabelText: (
        //   h(FormattedMessage, {
        //     id: 'agents.descriptionLabel',
        //     className: styles.labelText
        //   })
        // ),
        component: SelectField,
        onChange: (e, menuItem) => {
          selectAgent(menuItem)
        }
      }, [
        map((agent) => {
          return h(MenuItem, {
            value: agent.id,
            primaryText: agent.name
          })
        }, agentCollection)
      ]),
      h(RaisedButton, {
        className: styles.button,
        type: 'button',
        onClick: (ev) => {
          // GK: not entirely clear why this is necessary considering the button type, but preventing default anyway
          ev.preventDefault()
          console.log('going to create a new agent / relationship')
        }
      }, 'create new')
    ])
  ])
}

export default compose(
  connectFela(styles),
  connectForm({
    form: 'selectAgent', // TODO: probably need to pass in the form name so they don't all have the same name
    enableReinitialize: true
  })
)(SelectAgentForOrder)
