import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { flow } from 'lodash'
import { TextField } from 'redux-form-material-ui'

import styles from '../styles/Profile'
import AvatarField from '../../app/components/AvatarField'

function Profile (props) {
  const { styles, profile, handleSubmit } = props
  const { name, description } = profile
  return (
    <form className={styles.container}>
      <Field
        name='avatar'
        label='Avatar'
        component={AvatarField}
      />
      <Field
        name='name'
        floatingLabelText='Name'
        component={TextField}
        value={name}
      />
      <Field
        name='description'
        floatingLabelText='Description'
        component={TextField}
        value={description}
        multiLine={true}
        maxWidth={true}
        rows={3}
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
  connectForm({
    form: 'profile',
    initialValues: {
      avatar: 'http://dinosaur.is/images/mikey-small.jpg',
      name: 'classic nixon',
      description: "it's classic nixon"
    }
  })
)(Profile)
