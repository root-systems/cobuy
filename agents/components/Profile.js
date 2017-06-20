import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { flow } from 'lodash'

import styles from '../styles/Profile'

import TextField from '../../app/components/TextField'

function Profile (props) {
  const { styles, profile, handleSubmit } = props
  const { name, description } = profile
  return (
    <form className={styles.container}>
      <Field
        label='Name'
        name='name'
        component={TextField}
        value={name}
      />
      <Field
        label='Description'
        name='description'
        component={TextField}
        value={description}
      />
    </form>
  )
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
}

Profile.defaultProps = {
}

export default flow(
  connectFela(styles),
  connectForm({ form: 'profile '})
)(Profile)
