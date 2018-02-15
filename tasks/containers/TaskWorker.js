import h from 'react-hyperscript'
import { isNil, pipe, filter, keys, length, gte, propEq, not, __ } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose, lifecycle, withState, withHandlers } from 'recompose'
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
    // TODO far3
    query: []
    /*
    // TODO can optimize `feathers-action-react` to de-dupe
    // new queries by checking if deepEqual
    query: (props) => {
      const { taskPlanId } = props.match.params
      const { taskPlan } = props.selected
      var queries = [
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
      ]

      // once we have the task work, query for the child task works
      const { taskWork } = taskPlan || {}
      if (taskWork) {
        queries.push({
          service: 'taskWorks',
          params: {
            query: {
              parentTaskWorkId: taskWork.id
            }
          }
        })
      }

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.selected

      // wait for task plan before re-query
      if (isNil(taskPlan)) return false

      // re-query when we haven't gotten back taskWork
      const { taskWork } = taskPlan

      if (not(hasQueriedTaskWorks(status.requests))) return true

      return false
    }
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
    */
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

const hasQueriedTaskWorks = pipe(
  filter(propEq('service', 'taskWorks')),
  keys,
  length,
  gte(__, 1)
)
