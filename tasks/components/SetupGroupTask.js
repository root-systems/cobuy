import h from 'react-hyperscript'
import { isNil, merge, isEmpty } from 'ramda'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'
import MemberInvites from '../../agents/components/MemberInvites'

export default (props) => {
  const { taskPlan, actions } = props
  if (isNil(taskPlan)) return null
  const { params: { contextAgent } } = taskPlan
  if (isNil(contextAgent)) return null

  const { profile } = contextAgent

  const steps = [
    {
      id: 'tasks.steps.groupProfile',
      content: h(Profile, {
        agent: contextAgent,
        updateProfile: (nextProfile) => {
          actions.profiles.update(profile.id, merge(nextProfile, { agentId: contextAgent.id }))
        }
      })
    },
    {
      id: 'tasks.steps.memberInvites',
      content: h(MemberInvites, {
        agent: contextAgent,
        createMembers: (membersData) => {
          console.log(membersData)
          return membersData.members.map((member) => {
            if (isEmpty(member)) return null
            actions.agents.create(member)
          })
        }
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}
