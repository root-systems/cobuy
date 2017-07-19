import { createSelector } from 'reselect'
import { map, merge } from 'ramda'

import getAgents from '../../agents/getters/getAgents'
import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskRecipes from './getRawTaskRecipes'

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

export default getEnhancedTaskPlans
