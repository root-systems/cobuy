import h from 'react-hyperscript'
import { connect as connectRedux } from 'react-redux'
import { connect as connectFela } from 'react-fela'
import { Field, FieldArray, formValueSelector, reduxForm as connectForm } from 'redux-form'
import { pipe } from 'ramda'
import { TextField, SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/MemberInvites'

function renderMembers ({ fields, meta: { error, submitFailed }, formProps }) {
  const { memberVals, styles } = formProps

  // TODO: currently this is an anti-pattern as it occurs within the render cycle
  // TODO: mikey's idea was to not push state until the first edit to the empty row
  if (memberVals) {
    const memberKeys = Object.keys(memberVals)
    if (memberKeys.length > 0) {
      const lastMember = memberVals[memberKeys[memberKeys.length - 1]]
      if (Object.keys(lastMember).length > 0) {
        fields.push({})
      }
    }
  }

  return (
    h('div', {
      className: styles.fieldsContainer
    }, [
      submitFailed && error && h('span', error),
      fields.map((member, index) => (
        h('div', {
          key: index,
          className: styles.rowContainer
        }, [
          h(Field, {
            name: `${member}.agent.profile.name`,
            floatingLabelText: (
              h(FormattedMessage, {
                id: 'agents.nameLabel',
                className: styles.labelText
              })
            ),
            component: TextField
          }),
          h(Field, {
            name: `${member}.agent.credential.email`,
            floatingLabelText: (
              h(FormattedMessage, {
                id: 'agents.email',
                className: styles.labelText
              })
            ),
            component: TextField
          }),
          h(Field, {
            name: `${member}.role`,
            floatingLabelText: (
              h(FormattedMessage, {
                id: 'agents.role',
                className: styles.labelText
              })
            ),
            component: SelectField
          }, [
            h(MenuItem, {
              value: 'member',
              primaryText: (
                h(FormattedMessage, {
                  id: 'agents.member',
                  className: styles.labelText
                })
              )
            }),
            h(MenuItem, {
              value: 'admin',
              primaryText: (
                h(FormattedMessage, {
                  id: 'agents.admin',
                  className: styles.labelText
                })
              )
            })
          ]),
          h('div', {
            className: styles.removeButtonContainer
          }, [
            h(RaisedButton, {
              type: 'button',
              className: styles.button,
              onClick: () => fields.remove(index)
            }, [
              h(FormattedMessage, {
                id: 'agents.removeMember',
                className: styles.buttonText
              })
            ])
          ])
        ])
      )),
      h('div', {
        className: styles.addButtonContainer
      }, [
        h(RaisedButton, {
          type: 'button',
          className: styles.button,
          onClick: () => fields.push({})
        }, [
          h(FormattedMessage, {
            id: 'agents.addMember',
            className: styles.buttonText
          })
        ])
      ])
    ])
  )
}

function MemberInvites (props) {
  const { styles, createMembers, handleSubmit } = props

  return (
    h('form', {
      className: styles.container,
      onSubmit: handleSubmit(createMembers)
    }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'agents.memberInvites',
          className: styles.labelText
        })
      ]),
      h(FieldArray, {
        name: 'members',
        component: renderMembers,
        formProps: props
      }),
      h('div', {
        className: styles.addButtonContainer
      }, [
        h(RaisedButton, {
          type: 'submit',
          className: styles.button
        }, [
          h(FormattedMessage, {
            id: 'agents.inviteMembers',
            className: styles.buttonText
          })
        ])
      ])
    ])
  )
}

const selector = formValueSelector('memberInvites')

export default pipe(
  connectFela(styles),
  connectForm({
    form: 'memberInvites',
    enableReinitialize: true
  }),
  connectRedux(
    state => ({
      memberVals: selector(state, 'members')
    })
  )
)(MemberInvites)
