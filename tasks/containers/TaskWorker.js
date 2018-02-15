import h from 'react-hyperscript'
import { ifElse, isNil, pipe, prop, map, not } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose, lifecycle, withState, withHandlers } from 'recompose'
import { push } from 'react-router-redux'
import {
  createSelector,
  createStructuredSelector
} from 'reselect'

import TaskWorker from '../components/TaskWorker'
import { actions as taskPlans } from '../dux/plans'
import { actions as taskWorks } from '../dux/works'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentTaskPlanId from '../getters/getCurrentTaskPlanId'
import getCurrentTaskPlan from '../getters/getCurrentTaskPlan'
import getFeathersData from '../getters/getFeathersData'

export default compose(
  connectFeathers({
    selector: createStructuredSelector({
      taskPlan: getCurrentTaskPlan,
      currentAgent: getCurrentAgent,
      feathersData: getFeathersData
    }),
    actions: {
      taskPlans,
      taskWorks,
      // `feathers-action-react` wraps every
      //  action creator in a cid creator.
      router: {
        push: (cid, ...args) => push(...args)
      }
    },
    // TODO far3 handle case where navigate to same page with new params
    // https://github.com/root-systems/feathers-action-react/pull/8#issuecomment-365826271
    query: [
      {
        name: 'parentTaskPlan',
        service: 'taskPlans',
        id: getCurrentTaskPlanId
      },
      {
        name: 'childTaskPlans',
        service: 'taskPlans',
        params: createSelector(
          getCurrentTaskPlanId,
          (taskPlanId) => ({
            query: {
              parentTaskPlanId: taskPlanId
            }
          })
        )
      },
      {
        name: 'parentTaskWorks',
        service: 'taskWorks',
        params: createSelector(
          getCurrentTaskPlanId,
          (taskPlanId) => ({
            query: {
              taskPlanId
            }
          })
        )
      },
      {
        name: 'childTaskWorks',
        service: 'taskWorks',
        dependencies: [
          'childTaskPlans',
        ],
        params: createSelector(
          getCurrentTaskPlan,
          ifElse(
            isNil,
            () => null,
            pipe(
              prop('childTaskPlans'),
              map(prop('id')),
              (childTaskPlanIds) => ({
                query: {
                  taskPlanId: {
                    $in: childTaskPlanIds
                  }
                }
              })
            )
          )
        )
      }
    ]
  }),
  withState('createTaskWorkerCid', 'editTaskWorkerCid', null),
  withHandlers({
    setTaskWorkerId: ({ editTaskWorkerCid }) => (cId) => editTaskWorkerCid(cId)
  }),
  lifecycle({
    componentWillReceiveProps: function (nextProps) {
      if (not(isNil(nextProps.createTaskWorkerCid)) &&
        nextProps.feathersData[nextProps.createTaskWorkerCid].isReady &&
        isNil(nextProps.feathersData[nextProps.createTaskWorkerCid].error)
      ) {
        const { setTaskWorkerId, taskPlan, actions } = nextProps
        const {
          parentTaskPlan,
          params: { orderId } = {}
        } = taskPlan
        const nextRoute = (
          (!isNil(parentTaskPlan))
            ? `/tasks/${parentTaskPlan.id}`
            : (!isNil(orderId))
              ? `/o/${orderId}`
              : `/tasks`
        )
        setTaskWorkerId(null)
        actions.router.push(nextRoute)
      }
    }
  })
)(props => {
  const { taskPlan, currentAgent, actions, setTaskWorkerId } = props

  return h(TaskWorker, {
    taskPlan,
    onNavigate: handleNavigate,
    onCancel: handleCancel,
    onComplete: handleComplete
  })

  function handleNavigate (taskPlan) {
    actions.router.push(`/tasks/${taskPlan.id}`)
  }

  function handleCancel (taskPlan) {
    const {
      parentTaskPlan,
      params: { orderId } = {}
    } = taskPlan
    const nextRoute = (
      (!isNil(parentTaskPlan))
        ? `/tasks/${parentTaskPlan.id}`
        : (!isNil(orderId))
          ? `/o/${orderId}`
          : `/tasks`
    )
    actions.router.push(nextRoute)
  }

  function handleComplete (taskplan) {
    const taskWork = {
      taskPlanId: taskPlan.id,
      taskRecipeId: taskplan.taskRecipeId,
      workerAgentId: currentAgent.id,
      params: {
        // contextAgentId: group.id
      }
    }

    setTaskWorkerId(actions.taskWorks.create(taskWork))
  }
})
