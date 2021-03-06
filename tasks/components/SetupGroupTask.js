import h from 'react-hyperscript'
import { isNil, merge, isEmpty, filter, equals, indexBy, prop } from 'ramda'

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
  const { taskPlan, actions, memberRelationships } = props
  if (isNil(taskPlan)) return null
  const { params: { consumerAgent } } = taskPlan
  if (isNil(consumerAgent)) return null

  const { profile, members } = consumerAgent

  const steps = [
    {
      id: 'tasks.steps.groupProfile',
      content: h(Profile, {
        initialValues: profile,
        updateProfile: (nextProfile) => {
          actions.profiles.update(profile.id, merge(nextProfile, { agentId: consumerAgent.id }))
        },
        agentType: 'group',
        isEditing: true,
        agent: consumerAgent,
        isSetupGroupTask: true
      })
    },
    {
      id: 'tasks.steps.memberInvites',
      content: h(MemberInvites, {
        agent: consumerAgent,
        initialValues: {
          members
        },
        removeMember: (memberVal) => {
          const memberRelationship = memberRelationships[memberVal.agentId]
          actions.relationships.remove(memberRelationship.id)
        },
        createMembers: (membersData) => {
          const groupMembersById = indexBy(prop('agentId'))
          const initialMemberValuesById = groupMembersById(members)
          const filterDirtyByInitialValuesComparison = memberData => !equals(memberData, initialMemberValuesById[memberData.agentId])
          const dirtyMembers = filter(filterDirtyByInitialValuesComparison, membersData.members)
          return dirtyMembers.map((member) => {
            if (isEmpty(member)) return null

            const { agent, roles } = member
            const {
              id,
              type = 'person',
              profile = {},
              credential = {}
            } = agent
            const relationships = rolesToRelationships(roles)
            const contextAgentId = consumerAgent.id

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
