import { createSelector } from 'reselect'
import { map, merge } from 'ramda'

import getAgents from '../../agents/getters/getAgents'
import getRawTaskPlans from './getRawTaskPlans'
import getRawTaskRecipes from './getRawTaskRecipes'

const populateTaskPlan = (rawTaskRecipes, agents) => {
  return (rawTaskPlan) => {
    const recipe = rawTaskRecipes[rawTaskPlan.taskRecipeId]
    const assignee = agents[rawTaskPlan.assignee]
    return merge(
      rawTaskPlan, {
        taskRecipe: recipe,
        assignee: assignee,
        childTaskPlans: map(recipe.childTaskRecipes, (childTaskRecipe) => {
          return {
            taskRecipe: childTaskRecipe,
            assignee: assignee,
            childTaskPlans: childTaskRecipe.childTaskPlans.length > 0 ? map(childTaskRecipe.childTaskPlans, populateTaskPlan(rawTaskRecipes, agents)) : []
          }
        })
      }
    )
  }
}

const getTaskPlans = createSelector(
  getRawTaskPlans,
  getRawTaskRecipes,
  getAgents,
  (rawTaskPlans, rawTaskRecipes, agents) => {
    return map(rawTaskPlans, populateTaskPlan(rawTaskRecipes, agents))
  }
)

export default getTaskPlans
