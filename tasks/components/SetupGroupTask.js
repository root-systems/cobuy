import React from 'react'
import Profile from '../../agents/components/Profile'

export default (props) => {
  const { taskPlan } = props
  const { agent } = taskPlan
  return <Profile agent={agent} />
}
