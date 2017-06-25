import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { map, flow } from 'lodash'
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
  const { styles, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
          label='Sign In'
          primary={true}
          className={styles.signInAction}
        />
        <FlatButton
          label='Create new account'
          className={styles.registerAction}
        />
      </div>
    </form>
  )
}

LocalAuthenticationForm = flow(
  connectForm({
    form: 'localAuthenticationForm'
  })
)(LocalAuthenticationForm)

function SignIn (props) {
  const { styles } = props
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
      <LocalAuthenticationForm
        styles={styles}
      />
    </div>
  )
}

SignIn.propTypes = {
}

SignIn.defaultProps = {
}

export default flow(
  connectFela(styles)
)(SignIn)
