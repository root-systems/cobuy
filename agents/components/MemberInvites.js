import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { flow } from 'lodash'
import { TextField } from 'redux-form-material-ui'

import styles from '../styles/MemberInvites'
import Button from '../../app/components/Button'
import MemberInvite from './MemberInvite'

class MemberInvites extends React.Component {
  render () {
    return (
      <form className={styles.container}>
        <Field
          name='groupName'
          type='text'
          component={TextField}
          floatingLabelText='Group Name'
        />
        <MemberInvite />
        <MemberInvite />
        <MemberInvite />
      </form>
    )
  }
}

export default flow(
  connectFela(styles),
  connectForm({
    form: 'memberInvites'
  })
)(MemberInvites)
