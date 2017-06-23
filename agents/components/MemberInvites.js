import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectRedux } from 'react-redux'
import { connect as connectFela } from 'react-fela'
import { Field, FieldArray, formValueSelector, reduxForm as connectForm } from 'redux-form'
import { flow } from 'lodash'
import { TextField } from 'redux-form-material-ui'
import MuiTextField from 'material-ui/TextField'

import styles from '../styles/MemberInvites'
import Button from '../../app/components/Button'

class MemberInviteFields extends React.Component {
  render () {
    const { fields } = this.props
    return (
      <div ref='members'>
        {fields.map((member, index) => (
          <div key={index} className='member'>
            <Field
              name={`${member}.name`}
              className='name'
              floatingLabelText='Name'
              component={TextField}
            />
            <Field
              name={`${member}.email`}
              className='email'
              floatingLabelText='Email'
              component={TextField}
            />
            <Field
              name={`${member}.role`}
              className='role'
              floatingLabelText='Role'
              component={TextField}
            />
            <Button type='button' onClick={() => fields.remove(index)}>Remove Member</Button>
          </div>
        ))}
        <div key={fields.length}>
          <MuiTextField
            floatingLabelText='Name'
            onChange={this.pushNext('name')}
          />
          <MuiTextField
            floatingLabelText='Email'
            onChange={this.pushNext('email')}
          />
          <MuiTextField
            floatingLabelText='Role'
            onChange={this.pushNext('role')}
          />
        </div>
      </div>
    )
  }

  pushNext (fieldName) {
    const { fields } = this.props
    return (ev, value) => {
      fields.push({ [fieldName]: value })
      const { members } = this.refs
      // HACK (mw) how can we clean this up?
      // keep focus after we push next member field
      // because react elements will change underneath.
      // also there's enough of a stutter that when
      // typing you will lose some characters.
      setTimeout(() => {
        const memberElements = members.querySelectorAll('.member')
        const lastMemberElement = memberElements[memberElements.length - 1]
        lastMemberElement.querySelector('.' + fieldName + ' input').focus()
      })
    }
  }
}
function MemberInvites ({ fields, meta: { error, submitFailed } }) {
  return (
    <div>
      {submitFailed && error && <span>{error}</span>}
      <MemberInviteFields fields={fields} />
    </div>
  )
}

function MemberInvitesForm (props) {
  return (
    <form className={styles.container}>
      <FieldArray name='members' component={MemberInvites} />
    </form>
  )
}

export default flow(
  connectFela(styles),
  connectForm({
    form: 'memberInvites'
  })
)(MemberInvitesForm)
