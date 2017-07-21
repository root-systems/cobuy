import h from 'react-hyperscript'
import { isNil } from 'ramda'
import { bindActionCreators } from 'redux'
import { connect as connectRedux } from 'react-redux'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'
import { push } from 'react-router-redux'

import { actions as taskPlans } from '../dux/plans'
import { actions as taskWorks } from '../dux/works'
import getTaskWorkerProps from '../getters/getTaskWorkerProps'
import TaskWorker from '../components/TaskWorker'

export default compose(
  connectFeathers({
    selector: getTaskWorkerProps,
    actions: {
      taskPlans,
      taskWorks,
      // `feathers-action-react` wraps every
      //  action creator in a cid creator.
      router: {
        push: (cid, ...args) => push(...args)
      }
    },
    query: ({ taskPlanId }) => [
      {
        service: 'taskPlans',
        id: taskPlanId
      },
      {
        service: 'taskPlans',
        params: {
          query: {
            parentTaskPlanId: taskPlanId
          }
        }
      },
      {
        service: 'taskWorks',
        params: {
          query: {
            taskPlanId
          }
        }
      }
      // TODO how do we fetch child task works from task plan?
      // need to re-query after the first one is done
    ]
  })
)(props => {
  const { currentTaskPlan: taskPlan, currentAgent: agent, actions } = props

  return h(TaskWorker, {
    taskPlan,
    onNavigate: handleNavigate,
    onCancel: handleCancel
  })

  function handleNavigate (taskPlan) {
    actions.router.push(`/tasks/${taskPlan.id}`)
  }

  function handleCancel (taskPlan) {
    const { parentTaskPlan } = taskPlan
    const nextRoute = isNil(parentTaskPlan)
      ? '/' : `/tasks/${parentTaskPlan.id}`
    actions.router.push(nextRoute)
  }
})
