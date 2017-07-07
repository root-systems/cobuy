import React from 'react'
import Stepper from 'material-ui/Stepper'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'
import MemberInvites from '../../agents/components/MemberInvites'


export default (props) => {
  const { taskPlan } = props
  const { agent } = taskPlan

  const steps = [
    {
      id: 'tasks.steps.groupProfile',
      content: (
        <Profile agent={agent} />
      )
    },
    {
      id: 'tasks.steps.memberInvites',
      content: (
        <MemberInvites />
      )
    }
  ]

  return <TaskStepper
    steps={steps}
  />
}
