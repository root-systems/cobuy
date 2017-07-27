import h from 'react-hyperscript'
import Stepper from 'material-ui/Stepper'
import { isNil, path } from 'ramda'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'
import MemberInvites from '../../agents/components/MemberInvites'

export default (props) => {
  const { taskPlan } = props
  if (isNil(taskPlan)) return null
  const { params: { contextAgent } } = taskPlan
  if (isNil(contextAgent)) return null

  const { profile } = contextAgent

  console.log('contextAgent', contextAgent)

  const steps = [
    {
      id: 'tasks.steps.groupProfile',
      content: h(Profile, {
        agent: contextAgent,
        handleSubmit: (nextProfile) => {
          console.log('handleSubmit', nextProfile)
          // actions.profiles.update(profile.id, nextProfile)
        }
      })
    },
    {
      id: 'tasks.steps.memberInvites',
      content: h(MemberInvites, {

      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}
