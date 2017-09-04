import { createSelector } from 'reselect'
import { map, merge, defaultTo, isNil, filter, propEq } from 'ramda'

import { getAgents } from 'dogstack-agents/getters'
import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskWorks from './getRawTaskWorks'
import getRawTaskRecipes from './getRawTaskRecipes'

const defaultToEmptyObject = defaultTo({})

const getEnhancedTaskPlans = createSelector(
  getRawTaskPlans,
  getRawTaskRecipes,
  getAgents,
  getRawTaskWorks,
  (taskPlans, taskRecipes, agents, taskWorks) => {
    const enhanceTaskPlan = (taskPlan) => {
      const { taskRecipeId, assigneeId, id } = taskPlan
      const params = defaultToEmptyObject(taskPlan.params)
      const taskRecipe = taskRecipes[taskRecipeId]
      const assignee = agents[assigneeId]
      const taskWork = filter(propEq('taskPlanId', id))(taskWorks)

      const { consumerAgentId, supplierAgentId } = params
      const consumerAgent = isNil(consumerAgentId)
        ? null
        : agents[consumerAgentId]
      const supplierAgent = isNil(supplierAgentId)
        ? null
        : agents[supplierAgentId]
      const nextParams = merge(params, {
        consumerAgent,
        supplierAgent
      })

      return merge(taskPlan, {
        taskRecipe,
        assignee,
        taskWork,
        params: nextParams
      })
    }
    return map(enhanceTaskPlan, taskPlans)
  }
)

export default getEnhancedTaskPlans
