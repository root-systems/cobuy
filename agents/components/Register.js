import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { mapObjIndexed, pipe } from 'ramda'
import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { required, email, length, confirmation } from 'redux-form-validators'

import styles from '../styles/Register'
import config from '../../config/default'
const remoteAuthenticationMethods = config.auth.remote

// https://blog.codinghorror.com/the-god-login/

function LocalAuthenticationForm (props) {
  const { styles, handleSubmit, navigateToSignIn } = props

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field
        name='name'
        floatingLabelText='Name'
        fullWidth={true}
        component={TextField}
        validate={required()}
      />
      <Field
        name='email'
        type='email'
        floatingLabelText='Email'
        fullWidth={true}
        component={TextField}
        validate={email()}
      />
      <Field
        name='password'
        type='password'
        floatingLabelText='Password'
        fullWidth={true}
        component={TextField}
        validate={length({ min: 8 })}
      />
      <Field
        name='passwordConfirm'
        type='password'
        floatingLabelText='Confirm Password'
        fullWidth={true}
        component={TextField}
        validate={confirmation({ field: 'password', fieldLabel: 'Password' })}
      />
      <div className={styles.actions}>
        <RaisedButton
          type='submit'
          label='Create new account'
          primary={true}
          className={styles.registerAction}
        />
        <FlatButton
          label='Sign In'
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

  const mapRemoteAuthenticationMethods = mapObjIndexed((method, name) => (
    <li
      className={styles.remote}
    >
      <RaisedButton
        label={method.label}
        icon={<FontIcon className={method.icon} />}
        backgroundColor={method.backgroundColor}
        hoverColor={method.hoverColor}
        fullWidth={true}
        href={`/auth/${name}`}
      />
    </li>
  ))

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        Hey, welcome to Cobuy!
      </p>
      <ul className={styles.remotes}>
        {mapRemoteAuthenticationMethods(remoteAuthenticationMethods)}
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
