import { isNil, is, find, map, indexBy, prop, __ } from 'ramda'

import BuildIcon from 'material-ui/svg-icons/action/build'
import AssignmentIcon from 'material-ui/svg-icons/action/assignment'
import CompareIcon from 'material-ui/svg-icons/action/compare-arrows'

const isArray = is(Array)

export const orderStatuses = [
  {
    name: 'setup', // TODO intl
    description: 'Setup details and start order.', // TODO intl
    Icon: BuildIcon,
    recipeId: [
      'completeOrderSetupWithPrereqs',
      'completeOrderSetup'
    ],
  },
  {
    name: 'intend', // TODO intl
    description: 'Share intents to buy!', // TODO intl
    Icon: AssignmentIcon,
    recipeId: 'castIntent'
  },
  {
    name: 'commit', // TODO intl
    description: 'Close an order, combine individual intents and commit to a purchase order ready to send to a supplier. Your group will no longer be able to go through the Intent phase.', // TODO intl
    Icon: CompareIcon,
    recipeId: 'commitOrder'
  },
]

export const orderStatusesByName = indexBy(prop('name'), orderStatuses)

export function getOrderStatus ({ order, taskPlansByRecipe }) {
  if (isNil(taskPlansByRecipe)) return null

  const { completeOrderSetup, completeOrderSetupWithPrereqs, closeOrder } = taskPlansByRecipe
  if (!(
    (completeOrderSetup && completeOrderSetup.hasWork) ||
    (completeOrderSetupWithPrereqs && completeOrderSetupWithPrereqs.hasWork)
  )) {
    return 'setup'
  } else if (!(closeOrder && closeOrder.hasWork)) {
    return 'intend'
  } else {
    return 'commit'
  }
  return null
}


export function getTaskPlanForStatus ({ order, status, taskPlansByRecipe }) {
  if (isNil(taskPlansByRecipe)) return null
  var { recipeId } = orderStatusesByName[status]
  if (isArray(recipeId)) {
    const findTaskPlan = find(prop(__, taskPlansByRecipe))
    recipeId = findTaskPlan(recipeId)
  }
  return taskPlansByRecipe[recipeId]
}

export function getTaskPlansByStatus ({ order, taskPlansByRecipe }) {
  const getTaskPlansForEachStatus = map(({ name: status }) => {
    return getTaskPlanForStatus({ order, status, taskPlansByRecipe })
  })
  return getTaskPlansForEachStatus(orderStatusesByName)
}
