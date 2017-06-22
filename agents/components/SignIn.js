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

const remoteAuthenticationMethods = [
  {
    label: 'with Google',
    icon: 'fa-google'
  },
  {
    label: 'with Facebook',
    icon: 'fa-facebook'
  },
  {
    label: 'with Twitter',
    icon: 'fa-twitter'
  },
  {
    label: 'with GitHub',
    icon: 'fa-github'
  }
]

function LocalAuthenticationForm (props) {
  const { styles, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field
        name='email'
        floatingLabelText='Email'
        component={TextField}
      />
      <Field
        name='password'
        type='password'
        floatingLabelText='Password'
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
      <div className={styles.remotes}>
        {map(remoteAuthenticationMethods, method => (
          <FlatButton
            label={method.label}
            icon={<FontIcon className={method.icon} />}
            className={styles.remote}
          />
        ))}
      </div>
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
