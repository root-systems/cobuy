import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { flow } from 'lodash'
import { TextField } from 'redux-form-material-ui'

import styles from '../styles/MemberInvite'

class MemberInvite extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      name: null,
      email: null,
      role: null
    }
  }

  render () {
    const { name, email, role } = this.state
    const { isEditing } = this.props

    return (
      <form className={styles.container}>
        <Field
          name='name'
          floatingLabelText='Name'
          component={TextField}
          value={name}
          disabled={!isEditing}
        />
        <Field
          name='email'
          floatingLabelText='Email'
          component={TextField}
          value={email}
          disabled={!isEditing}
        />
        <Field
          name='role'
          floatingLabelText='Role'
          component={TextField}
          value={role}
          disabled={!isEditing}
        />
      </form>
    )
  }
}

export default flow(
  connectFela(styles),
  connectForm({
    form: 'memberInvite'
  })
)(MemberInvite)
