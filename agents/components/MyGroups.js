import h from 'react-hyperscript'
import { isNil } from 'ramda'

// import Profile from '../../agents/components/Profile'

export default (props) => {
  const { actions, currentAgent, currentAgentGroupProfiles } = props

  if (isNil(currentAgent)) {
    return null
  }

  return h('div', {
    // className: styles.container
  })

  // return h(Profile, {
  //   initialValues: currentAgent.profile,
  //   updateProfile: (nextProfile) => {
  //     actions.profiles.update(currentAgent.profile.id, nextProfile)
  //   },
  //   agentType: 'my',
  //   isEditing: true,
  //   agent: currentAgent
  // })
}
