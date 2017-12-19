import { isNil, is, find, map, indexBy, prop, __ } from 'ramda'

import BuildIcon from 'material-ui/svg-icons/action/build'
import AssignmentIcon from 'material-ui/svg-icons/action/assignment'
import CompareIcon from 'material-ui/svg-icons/action/compare-arrows'

const isArray = is(Array)

const orderStatuses = [
  {
    name: 'setup',
    description: '...',
    Icon: BuildIcon,
    recipeId: [
      'completeOrderSetupWithPrereqs',
      'completeOrderSetup'
    ],
  },
  {
    name: 'intent',
    description: '...',
    Icon: AssignmentIcon,
    recipeId: 'castIntent'
  },
  {
    name: 'commitment',
    description: '...',
    Icon: CompareIcon,
    recipeId: 'commitOrder'
  },
]

const orderStatusesByName = indexBy(prop('name'), orderStatuses)

module.exports = {
  orderStatuses,
  orderStatusesByName,
  getOrderStatus,
  getTaskPlanForStatus,
  getTaskPlansByStatus
}

function getOrderStatus ({ order, taskPlansByRecipe }) {
  if (isNil(taskPlansByRecipe)) return null

  const { completeOrderSetup, completeOrderSetupWithPrereqs, closeOrder } = taskPlansByRecipe
  if (!(
    (completeOrderSetup && completeOrderSetup.hasWork) ||
    (completeOrderSetupWithPrereqs && completeOrderSetupWithPrereqs.hasWork)
  )) {
    return 'setup'
  } else if (!(closeOrder && closeOrder.hasWork)) {
    return 'intent'
  } else {
    return 'commitment'
  }
  return null
}


function getTaskPlanForStatus ({ order, status, taskPlansByRecipe }) {
  if (isNil(taskPlansByRecipe)) return null
  var { recipeId } = orderStatusesByName[status]
  if (isArray(recipeId)) {
    const findTaskPlan = find(prop(__, taskPlansByRecipe))
    recipeId = findTaskPlan(recipeId)
  }
  return taskPlansByRecipe[recipeId]
}

function getTaskPlansByStatus ({ order, taskPlansByRecipe }) {
  const getTaskPlansForEachStatus = map(({ name: status }) => {
    return getTaskPlanForStatus({ order, status, taskPlansByRecipe })
  })
  return getTaskPlansForEachStatus(orderStatusesByName)
}
