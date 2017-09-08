import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { mapObjIndexed, pipe } from 'ramda'
import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { required, email, length, confirmation } from '@root-systems/redux-form-validators'
import { FormattedMessage } from 'dogstack/intl'

import styles from '../styles/Register'
import RemoteAuthenticationMethods from './RemoteAuthenticationButtons'

// https://blog.codinghorror.com/the-god-login/

function LocalAuthenticationForm (props) {
  const { styles, handleSubmit, navigateToSignIn } = props

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field
        name='name'
        floatingLabelText={
          <FormattedMessage
            id='agents.nameLabel'
            className={styles.labelText}
          />
        }
        fullWidth={true}
        component={TextField}
        validate={required()}
      />
      <Field
        name='email'
        type='email'
        floatingLabelText={
          <FormattedMessage
            id='agents.email'
            className={styles.labelText}
          />
        }
        fullWidth={true}
        component={TextField}
        validate={email()}
      />
      <Field
        name='password'
        type='password'
        floatingLabelText={
          <FormattedMessage
            id='agents.password'
            className={styles.labelText}
          />
        }
        fullWidth={true}
        component={TextField}
        validate={length({ min: 8 })}
      />
      <Field
        name='passwordConfirm'
        type='password'
        floatingLabelText={
          <FormattedMessage
            id='agents.confirmPassword'
            className={styles.labelText}
          />
        }
        fullWidth={true}
        component={TextField}
        validate={confirmation({ field: 'password', fieldLabel: 'Password' })}
      />
      <div className={styles.actions}>
        <RaisedButton
          type='submit'
          label={
            <FormattedMessage
              id='agents.createAccount'
              className={styles.labelText}
            />
          }
          primary={true}
          className={styles.registerAction}
        />
        <FlatButton
          label={
            <FormattedMessage
              id='agents.signIn'
              className={styles.labelText}
            />
          }
          className={styles.signInAction}
          onClick={navigateToSignIn}
        />
      </div>
    </form>
  )
}

LocalAuthenticationForm = pipe(
  connectForm({
    form: 'localAuthenticationForm'
  })
)(LocalAuthenticationForm)


function Register (props) {
  const { styles, error, actions } = props

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        <FormattedMessage
          id='agents.welcome'
          className={styles.labelText}
        />
      </p>
      <ul className={styles.remotes}>
        <RemoteAuthenticationMethods
          styles={styles}
          signIn={actions.authentication.signIn}
        />
      </ul>
      {error && (
        <div className={styles.error}>
          {error.message}
        </div>
      )}
      <LocalAuthenticationForm
        styles={styles}
        onSubmit={actions.authentication.register}
        navigateToSignIn={navigateToSignIn}
      />
    </div>
  )

  function navigateToSignIn () {
    actions.router.push('/sign-in')
  }
}

Register.propTypes = {
}

Register.defaultProps = {
}

export default pipe(
  connectFela(styles)
)(Register)
