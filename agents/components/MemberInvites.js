import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectRedux } from 'react-redux'
import { connect as connectFela } from 'react-fela'
import { Field, FieldArray, formValueSelector, reduxForm as connectForm } from 'redux-form'
import { pipe } from 'ramda'
import { TextField } from 'redux-form-material-ui'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/MemberInvites'
import Button from '../../app/components/Button'

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
    <div>
      {submitFailed && error && <span>{error}</span>}
      {fields.map((member, index) => (
        <div key={index}>
          <Field
            name={`${member}.name`}
            floatingLabelText={
              <FormattedMessage
                id='agents.nameLabel'
                className={styles.labelText}
              />
            }
            component={TextField}
          />
          <Field
            name={`${member}.email`}
            floatingLabelText={
              <FormattedMessage
                id='agents.email'
                className={styles.labelText}
              />
            }
            component={TextField}
          />
          <Field
            name={`${member}.role`}
            floatingLabelText={
              <FormattedMessage
                id='agents.role'
                className={styles.labelText}
              />
            }
            component={TextField}
          />
          <Button type='button' onClick={() => fields.remove(index)}>
            <FormattedMessage
              id='agents.removeMember'
              className={styles.buttonText}
            />
          </Button>
        </div>
      )
    )}
      <Button type='button' onClick={() => fields.push({})}>
        <FormattedMessage
          id='agents.addMember'
          className={styles.buttonText}
        />
      </Button>
    </div>
  )
}

function MemberInvites (props) {
  const { styles } = props
  return (
    <form className={styles.container}>
      <Field
        name='groupName'
        type='text'
        component={TextField}
        floatingLabelText={
          <FormattedMessage
            id='agents.groupName'
            className={styles.labelText}
          />
          }
      />
      <FieldArray name='members' component={renderMembers} formProps={props} />
    </form>
  )
}

const selector = formValueSelector('memberInvites')

export default pipe(
  connectFela(styles),
  connectForm({
    form: 'memberInvites'
  }),
  connectRedux(
    state => ({
      memberVals: selector(state, 'members')
    })
  )
)(MemberInvites)
