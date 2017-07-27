import React from 'react'
import Stepper from 'material-ui/Stepper'
import { isNil, path } from 'ramda'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'
import MemberInvites from '../../agents/components/MemberInvites'



export default (props) => {
  const { taskPlan } = props
  const { params: { contextAgent } } = taskPlan

  console.log('contextAgent', contextAgent)

  const steps = [
    {
      id: 'tasks.steps.groupProfile',
      content: (
        <Profile agent={contextAgent} />
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
