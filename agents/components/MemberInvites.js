import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, FieldArray, reduxForm as connectForm } from 'redux-form'
import { flow } from 'lodash'
import { TextField } from 'redux-form-material-ui'

import styles from '../styles/MemberInvites'
import Button from '../../app/components/Button'

function renderMembers ({ fields, meta: { error, submitFailed } }) {
  return (
    <div>
      <Button type='button' onClick={() => fields.push({})}>Add Member</Button>
      {submitFailed && error && <span>{error}</span>}
      {fields.map((member, index) => (
        <div key={index}>
          <Field
            name={`${member}.name`}
            floatingLabelText='Name'
            component={TextField}
          />
          <Field
            name={`${member}.email`}
            floatingLabelText='Email'
            component={TextField}
          />
          <Field
            name={`${member}.role`}
            floatingLabelText='Role'
            component={TextField}
          />
          <Button type='button' onClick={() => fields.remove(index)}>Remove Member</Button>
        </div>
      ))}
    </div>
  )
}

function MemberInvites (props) {
  return (
    <form className={styles.container}>
      <Field
        name='groupName'
        type='text'
        component={TextField}
        floatingLabelText='Group Name'
      />
      <FieldArray name='members' component={renderMembers} />
    </form>
  )
}

export default flow(
  connectFela(styles),
  connectForm({
    form: 'memberInvites'
  })
)(MemberInvites)
