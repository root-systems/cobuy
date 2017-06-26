import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { mapObjIndexed, merge, pipe } from 'ramda'
import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

import styles from '../styles/SignIn'
import config from '../../config/default'
const remoteAuthenticationMethods = config.auth.remote

// https://blog.codinghorror.com/the-god-login/

function LocalAuthenticationForm (props) {
  const { styles, handleSubmit, signIn, navigateToRegister } = props

  return (
    <form onSubmit={handleSubmit(localAuth)} className={styles.form}>
      <Field
        name='email'
        floatingLabelText='Email'
        fullWidth={true}
        component={TextField}
      />
      <Field
        name='password'
        type='password'
        floatingLabelText='Password'
        fullWidth={true}
        component={TextField}
      />
      <div className={styles.actions}>
        <RaisedButton
          type='submit'
          label='Sign In'
          primary={true}
          className={styles.signInAction}
        />
        <FlatButton
          label='Create new account'
          className={styles.registerAction}
          onClick={navigateToRegister}
        />
      </div>
    </form>
  )

  function localAuth (payload) {
    signIn(merge(payload, { strategy: 'local' }))
  }
}

LocalAuthenticationForm = pipe(
  connectForm({
    form: 'localAuthenticationForm'
  })
)(LocalAuthenticationForm)

function SignIn (props) {
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
        Sign in with...
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
        signIn={actions.authentication.signIn}
        navigateToRegister={navigateToRegister}
      />
    </div>
  )

  function navigateToRegister () {
    actions.router.push('/register')
  }
}

SignIn.propTypes = {
}

SignIn.defaultProps = {
}

export default pipe(
  connectFela(styles)
)(SignIn)
