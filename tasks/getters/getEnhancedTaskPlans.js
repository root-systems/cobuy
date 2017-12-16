import { createSelector } from 'reselect'
import { map, merge, defaultTo, either, isNil, isEmpty } from 'ramda'

import { getAgents } from 'dogstack-agents/getters'
import getRawTaskPlans from './getRawTaskPlans'
import getTaskWorksByPlan from './getTaskWorksByPlan'
import getRawTaskRecipes from './getRawTaskRecipes'

const defaultToEmptyObject = defaultTo({})
const isNilOrEmpty = either(isNil, isEmpty)

const getEnhancedTaskPlans = createSelector(
  getRawTaskPlans,
  getRawTaskRecipes,
  getAgents,
  getTaskWorksByPlan,
  (taskPlans, taskRecipes, agents, taskWorksByPlan) => {
    const enhanceTaskPlan = (taskPlan) => {
      const { taskRecipeId, assigneeId, id } = taskPlan
      const params = defaultToEmptyObject(taskPlan.params)
      const taskRecipe = taskRecipes[taskRecipeId]
      const assignee = agents[assigneeId]

      const taskWorks = taskWorksByPlan[id]
      const hasWork = !isNilOrEmpty(taskWorks)

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
        taskWorks,
        hasWork,
        params: nextParams
      })
    }
    return map(enhanceTaskPlan, taskPlans)
  }
)

export default getEnhancedTaskPlans
