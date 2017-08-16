import { createSelector } from 'reselect'
import { map, merge, defaultTo, isNil } from 'ramda'

import { getAgents } from 'dogstack-agents/getters'
import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskRecipes from './getRawTaskRecipes'

const defaultToEmptyObject = defaultTo({})

const getEnhancedTaskPlans = createSelector(
  getRawTaskPlans,
  getRawTaskRecipes,
  getAgents,
  (taskPlans, taskRecipes, agents) => {
    const enhanceTaskPlan = (taskPlan) => {
      const { taskRecipeId, assigneeId } = taskPlan
      const params = defaultToEmptyObject(taskPlan.params)
      const taskRecipe = taskRecipes[taskRecipeId]
      const assignee = agents[assigneeId]

      const { contextAgentId } = params
      const contextAgent = isNil(contextAgentId)
        ? null
        : agents[contextAgentId]
      const nextParams = merge(params, {
        contextAgent
      })

      return merge(taskPlan, {
        taskRecipe,
        assignee,
        params: nextParams
      })
    }
    return map(enhanceTaskPlan, taskPlans)
  }
)

export default getEnhancedTaskPlans
