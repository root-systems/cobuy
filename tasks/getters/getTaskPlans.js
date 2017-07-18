import { createSelector } from 'reselect'
import { map, merge, pipe, values, groupBy, prop } from 'ramda'

import getAgents from '../../agents/getters/getAgents'
import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskRecipes from './getRawTaskRecipes'

/*
const populateTaskPlan3 = (rawTaskRecipes, agents) => {
  return (rawTaskPlan) => {
    const recipe = rawTaskRecipes[rawTaskPlan.taskRecipeId]
    const assignee = agents[rawTaskPlan.assignee]
    return merge(
      rawTaskPlan, {
        taskRecipe: recipe,
        assignee: assignee,
        childTaskPlans: map(recipe.childTaskRecipes, (childTaskRecipe) => {
          return {
            taskPlan:
            taskRecipe: childTaskRecipe,
            assignee: assignee,
            childTaskPlans: childTaskRecipe.childTaskRecipes.length > 0 ? map(childTaskRecipe.childTaskRecipes, populateTaskPlan(rawTaskRecipes, agents)) : []
          }
        })
      }
    )
  }
*/


const getEnhancedTaskPlans = createSelector(
  getRawTaskPlans,
  getRawTaskRecipes,
  getAgents,
  (taskPlans, taskRecipes, agents) => {
    const enhanceTaskPlan = (taskPlan) => {
      const taskRecipe = taskRecipes[taskPlan.taskRecipeId]
      const assignee = agents[taskPlan.assignee]
      return merge(taskPlan, {
        taskRecipe,
        assignee
      })
    }
    return map(enhanceTaskPlan, taskPlans)
  }
)

const getChildTaskPlansByParentId = createSelector(
  getEnhancedTaskPlans,
  pipe(
    values,
    groupBy(prop('parentTaskPlanId'))
  )
)

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

      // 4. resolve childs from tree (these MUST exist in tree, which is guaranteed by doing nodes with no childs first)
      const childTaskPlans = childTaskPlansByParentId[taskPlanId].map(({ id }) => taskPlanTree[id])

      // 5. set current node to tree
      taskPlanTree[taskPlanId] = merge(taskPlan, {
        childTaskPlans
      })

      // 6. then, recurse to parent (go to 2)
      if (taskPlan.parentId) {
        populateTaskPlanNodes(taskPlan.parentId)
      }
    }

    // 1. start with task plans with no children (tree leaf nodes)
    const taskPlanIdsWithNoChilds = Object.keys(taskPlansById).reduce((sofar, taskPlanId) => {
      const childs = childTaskPlansByParentId[taskPlanId]
      const hasNoChilds = childs.length === 0
      return hasNoChilds
        ? [...sofar, taskPlanId]
        : sofar
    }, [])

    taskPlanIdsWithNoChilds.forEach(populateTaskPlanNodes)

    // resolve parents as well
    Object.keys(taskPlansById).forEach(taskPlanId => {
      var taskPlan = taskPlanTree[taskPlanId]
      if (taskPlan.parentId) {
        taskPlan.parent = taskPlanTree[taskPlan.parentId]
      }
    })

    return taskPlanTree
  }
)

export default getTaskPlanTree
