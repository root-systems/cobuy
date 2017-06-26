import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { map, assign, flow } from 'lodash'
import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

import styles from '../styles/SignIn'

// https://blog.codinghorror.com/the-god-login/

const remoteAuthenticationMethods = [
  {
    label: 'Google',
    icon: 'fa fa-google',
    backgroundColor: '#ffffff'
  },
  {
    label: 'Facebook',
    icon: 'fa fa-facebook',
    backgroundColor: '#3b5998'
  },
  {
    label: 'Twitter',
    icon: 'fa fa-twitter',
    backgroundColor: '#00bced'
  },
  {
    label: 'GitHub',
    icon: 'fa fa-github',
    backgroundColor: '#6d6d6d'
  }
]

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
    signIn(assign(payload, { strategy: 'local' }))
  }
}

LocalAuthenticationForm = flow(
  connectForm({
    form: 'localAuthenticationForm'
  })
)(LocalAuthenticationForm)

function SignIn (props) {
  const { styles, error, actions } = props
  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        Sign in with...
      </p>
      <ul className={styles.remotes}>
        {map(remoteAuthenticationMethods, method => (
          <li
            className={styles.remote}
          >
            <RaisedButton
              label={method.label}
              icon={<FontIcon className={method.icon} />}
              backgroundColor={method.backgroundColor}
              hoverColor={method.hoverColor}
              fullWidth={true}
            />
          </li>
        ))}
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

export default flow(
  connectFela(styles)
)(SignIn)
