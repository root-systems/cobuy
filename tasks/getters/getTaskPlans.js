import { createSelector } from 'reselect'
import { merge, complement, isNil } from 'ramda'

import getEnhancedTaskPlans from './getEnhancedTaskPlans'
import getChildTaskPlansByParentId from './getChildTaskPlansByParentId'

const getTaskPlanTree = createSelector(
  getEnhancedTaskPlans,
  getChildTaskPlansByParentId,
  (taskPlansById, childTaskPlansByParentId) => {
    // tree will contain "linked nodes"
    var taskPlanTree = {}

    const populateTaskPlanNodes = (taskPlanId) => {
      // 2. if we've already done this node, early return
      if (taskPlanTree[taskPlanId]) return

      // 3. resolve new node from soure list
      const taskPlan = taskPlansById[taskPlanId]
      if (isNil(taskPlan)) return null
      // 4. resolve childs from tree (these MUST exist in tree, which is guaranteed by doing nodes with no childs first)
      const childTaskPlans = (childTaskPlansByParentId[taskPlanId] || []).map(({ id }) => taskPlanTree[id])

      // (these MUST exist in tree, which is guaranteed by doing nodes with no childs first)
      // if not, we can skip, because this parent will be queued by the last child eventually
      if (childTaskPlans.some(isNil)) return

      // 5. set current node to tree
      taskPlanTree[taskPlanId] = merge(taskPlan, {
        childTaskPlans
      })

      return taskPlan.parentTaskPlanId
    }

    // 1. start with task plans with no children (tree leaf nodes)
    const taskPlanIdsWithNoChilds = Object.keys(taskPlansById).reduce((sofar, taskPlanId) => {
      const childs = childTaskPlansByParentId[taskPlanId] || []
      const hasNoChilds = childs.length === 0
      return hasNoChilds
        ? [...sofar, taskPlanId]
        : sofar
    }, [])

    var nextChildIds = taskPlanIdsWithNoChilds
    // 6. loop, breadth first search up starting at nodes with no children
    while (nextChildIds.length !== 0) {
      nextChildIds = nextChildIds
        .map(populateTaskPlanNodes)
        .filter(complement(isNil))
    }

    // resolve parents as well
    Object.keys(taskPlansById).forEach(taskPlanId => {
      var taskPlan = taskPlanTree[taskPlanId]
      if (taskPlan && taskPlan.parentTaskPlanId) {
        taskPlan.parentTaskPlan = taskPlanTree[taskPlan.parentTaskPlanId]
      }
    })

    return taskPlanTree
  }
)

export default getTaskPlanTree
