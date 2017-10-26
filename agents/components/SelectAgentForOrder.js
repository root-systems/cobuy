import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { pipe, isNil, not, map, isArrayLike, merge } from 'ramda'
import { SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { compose, withState, withHandlers } from 'recompose'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/SelectAgentForOrder'
import AvatarField from '../../app/components/AvatarField'

const SelectAgentForOrderForm = compose(
  connectFela(styles),
  connectForm({})
)(props => {
  const { agentType, styles, isEditing, toggleEdit, selectAgent, handleSubmit, agentCollection } = props

  return h('form', {
    className: styles.container
  }, [
    h('div', {
      className: styles.innerContainer
    }, [
      h(Field, {
        name: 'selectAgent',
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'agents.labelText',
            values: {
              agentType
            },
            className: styles.labelText
          })
        ),
        component: SelectField,
        onChange: (e, agentId) => {
          selectAgent(agentId)
        }
      }, [
        map((agent) => {
          return h(MenuItem, {
            value: agent.id,
            primaryText: agent.name
          })
        }, agentCollection)
      ])
    ])
  ])
})

const SelectAgentForOrder = (props) => {
  const nextProps = merge(props, {
    form: `select-${props.agentType}`,
    enableReinitialize: true,
    initialValues: {
      selectAgent: props.selectedAgent ? props.selectedAgent.id : null
    }
  })
  return h(SelectAgentForOrderForm, nextProps)
}

export default SelectAgentForOrder
