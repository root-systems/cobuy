import React from 'react'
import { isNil } from 'ramda'
import Profile from '../../agents/components/Profile'

export default (props) => {
  const { actions, currentAgent } = props

  if(isNil(currentAgent)) {
    return null
  }

  return <Profile
    initialValues={currentAgent.profile}
    updateProfile={ (nextProfile) => {
      actions.profiles.update(currentAgent.profile.id, nextProfile)
    } }
  />
}
