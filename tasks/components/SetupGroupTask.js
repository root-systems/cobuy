import h from 'react-hyperscript'
import { isNil, merge, isEmpty } from 'ramda'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'
import MemberInvites from '../../agents/components/MemberInvites'

const roleToRelationships = {
  member: [ { relationshipType: 'member' } ],
  admin: [ { relationshipType: 'member' }, { relationshipType: 'admin' } ]
}

export default (props) => {
  const { taskPlan, actions } = props
  if (isNil(taskPlan)) return null
  const { params: { contextAgent } } = taskPlan
  if (isNil(contextAgent)) return null

  const { profile, members } = contextAgent

  console.log('members', members)

  const steps = [
    {
      id: 'tasks.steps.groupProfile',
      content: h(Profile, {
        initialValues: profile,
        updateProfile: (nextProfile) => {
          actions.profiles.update(profile.id, merge(nextProfile, { agentId: contextAgent.id }))
        }
      })
    },
    {
      id: 'tasks.steps.memberInvites',
      content: h(MemberInvites, {
        agent: contextAgent,
        initialValues: {
          members
        },
        createMembers: (membersData) => {
          return membersData.members.map((member) => {
            if (isEmpty(member)) return null
            const agentData = {
              type: 'person',
              credential: {
                email: member.email
              },
              profile: {
                name: member.name
              },
              relationships: roleToRelationships[member.role],
              contextAgent
            }
            actions.agents.create(agentData)
          })
        }
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}
