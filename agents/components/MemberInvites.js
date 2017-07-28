import PropTypes from 'prop-types'
import React from 'react'
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
    <div className={styles.fieldsContainer}>
      {submitFailed && error && <span>{error}</span>}
      {fields.map((member, index) => (
        <div key={index} className={styles.rowContainer}>
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
            component={SelectField}
          >
            <MenuItem
              value='member'
              primaryText={
                <FormattedMessage
                  id='agents.member'
                  className={styles.labelText}
                />
              }
            />
            <MenuItem
              value='admin'
              primaryText={
                <FormattedMessage
                  id='agents.admin'
                  className={styles.labelText}
                />
              }
            />
          </Field>
          <div className={styles.removeButtonContainer}>
            <RaisedButton type='button' className={styles.button} onClick={() => fields.remove(index)}>
              <FormattedMessage
                id='agents.removeMember'
                className={styles.buttonText}
              />
            </RaisedButton>
          </div>
        </div>
      )
    )}
      <div className={styles.addButtonContainer}>
        <RaisedButton type='button' className={styles.button} onClick={() => fields.push({})}>
          <FormattedMessage
            id='agents.addMember'
            className={styles.buttonText}
          />
        </RaisedButton>
      </div>
    </div>
  )
}

function MemberInvites (props) {
  const { styles, createMembers, handleSubmit } = props
  return (
    <form className={styles.container} onSubmit={handleSubmit(createMembers)}>
      <p className={styles.intro}>
        <FormattedMessage
          id='agents.memberInvites'
          className={styles.labelText}
        />
      </p>
      <FieldArray name='members' component={renderMembers} formProps={props} />
      <div className={styles.addButtonContainer}>
        <RaisedButton type='submit' className={styles.button}>
          <FormattedMessage
            id='agents.inviteMembers'
            className={styles.buttonText}
          />
        </RaisedButton>
      </div>
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
