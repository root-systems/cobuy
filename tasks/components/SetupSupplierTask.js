import h from 'react-hyperscript'
import { isNil, merge, isEmpty } from 'ramda'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'
import MemberInvites from '../../agents/components/MemberInvites'

const rolesToRelationships = (roles = {}) => {
  var relationships = [
    { relationshipType: 'member' }
  ]
  if (roles.admin) {
    relationships.push({
      relationshipType: 'admin'
    })
  }
  return relationships
}

export default (props) => {
  const { taskPlan, actions } = props
  if (isNil(taskPlan)) return null
  const { params: { contextAgent } } = taskPlan
  if (isNil(contextAgent)) return null

  const { profile, members } = contextAgent

  const steps = [
    {
      id: 'tasks.steps.supplierProfile',
      content: h(Profile, {
        initialValues: profile,
        updateProfile: (nextProfile) => {
          actions.profiles.update(profile.id, merge(nextProfile, { agentId: contextAgent.id }))
        }
      })
    },
  ]

  return h(TaskStepper, {
    steps
  })
}
