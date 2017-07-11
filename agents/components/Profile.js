import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { pipe } from 'ramda'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/Profile'
import Button from '../../app/components/Button'
import AvatarField from '../../app/components/AvatarField'

class Profile extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isEditing: false
    }
  }

  toggleEdit () {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  render () {
    const { isEditing } = this.state
    const { styles, agent, agent: { profile: { name, description, avatar } } } = this.props

    return (
      <form className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.avatarContainer}>
            <Field
              name='avatar'
              component={AvatarField}
              isEditingProfile={isEditing}
              value={avatar}
            />
          </div>
          <div className={styles.infoContainer}>
            <Field
              name='name'
              floatingLabelText={
                <FormattedMessage
                  id='agents.nameLabel'
                  className={styles.labelText}
                />
              }
              component={TextField}
              value={name}
              disabled={!isEditing}
            />
            <Field
              name='description'
              floatingLabelText={
                <FormattedMessage
                  id='agents.descriptionLabel'
                  className={styles.labelText}
                />
              }
              component={TextField}
              value={description}
              multiLine={true}
              rowsMax={5}
              disabled={!isEditing}
            />
          </div>
        </div>
        <RaisedButton type='button' onClick={() => { this.toggleEdit() }}>
          {
            isEditing
            ? <FormattedMessage
                id='agents.saveProfile'
                className={styles.labelText}
              />
            : <FormattedMessage
                id='agents.editProfile'
                className={styles.labelText}
              />
          }
        </RaisedButton>
      </form>
    )
  }

}

Profile.propTypes = {
  agent: PropTypes.shape({
    profile: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  })
}

Profile.defaultProps = {
}

export default pipe(
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
