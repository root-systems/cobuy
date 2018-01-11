import { isNil, is, find, map, indexBy, prop, __ } from 'ramda'

import BuildIcon from 'material-ui/svg-icons/action/build'
import AssignmentIcon from 'material-ui/svg-icons/action/assignment'
import CompareIcon from 'material-ui/svg-icons/action/compare-arrows'

const isArray = is(Array)

export const orderStatuses = [
  {
    name: 'setup',
    nameIntlId: 'ordering.setup',
    description: 'ordering.setupStageDescription',
    Icon: BuildIcon,
    recipeId: [
      'completeOrderSetupWithPrereqs',
      'completeOrderSetup'
    ],
    hint: 'ordering.whatIsSetup'
  },
  {
    name: 'intend',
    nameIntlId: 'ordering.intend',
    description: 'ordering.intentStageDescription',
    Icon: AssignmentIcon,
    recipeId: 'castIntent',
    hint: 'ordering.whatIsIntent'
  },
  {
    name: 'commit',
    nameIntlId: 'ordering.commit',
    description: 'ordering.commitStageDescription',
    Icon: CompareIcon,
    recipeId: 'commitOrder',
    hint: 'ordering.whatIsCommit'
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
