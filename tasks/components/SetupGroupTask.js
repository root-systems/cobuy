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
        removeMember: (agentId) => {
          actions.agents.remove(agentId)
        },
        createMembers: (membersData) => {
          return membersData.members.map((member) => {
            if (isEmpty(member)) return null

            const { agent, roles } = member
            const {
              id,
              type = 'person',
              profile = {},
              credential = {},
            } = agent
            const relationships = rolesToRelationships(roles)
            const contextAgentId = contextAgent.id

            const agentData = {
              id,
              type,
              profile,
              credential,
              relationships,
              contextAgentId
            }

            if (isNil(agentData.id)) {
              actions.agents.create(agentData)
            } else {
              actions.agents.patch(id, agentData)
            }
          })
        }
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}
