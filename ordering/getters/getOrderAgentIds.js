import { createSelector } from 'reselect'
import { pipe, values, map, prop, props, unnest, uniq, ifElse, isNil } from 'ramda'

import getOrdersForCurrentAgent from './getOrdersForCurrentAgent'
import getCurrentOrder from './getCurrentOrder'

const getAgentIdsFromOrder = props(['consumerAgentId', 'supplierAgentId', 'adminAgentId'])

const getAgentIdsFromOrders = pipe(
  values,
  map(getAgentIdsFromOrder),
  unnest,
  uniq
)


export const getAgentIdsForCurrentAgentOrders = createSelector(
  getOrdersForCurrentAgent,
  getAgentIdsFromOrders
)

export const getAgentIdsForCurrentOrder = createSelector(
  getCurrentOrder,
  ifElse(
    isNil,
    () => null,
    getAgentIdsFromOrder
  )
)

const getConsumerAgentIdsFromOrder = prop('consumerAgentId')

const getConsumerAgentIdsFromOrders = pipe(
  values,
  map(getConsumerAgentIdsFromOrder),
  uniq
)

export const getConsumerAgentIdsForCurrentAgentOrders = createSelector(
  getOrdersForCurrentAgent,
  getConsumerAgentIdsFromOrders
)

export const getConsumerAgentIdForCurrentOrder = createSelector(
  getCurrentOrder,
  ifElse(
    isNil,
    () => null,
    getConsumerAgentIdsFromOrder
  )
)
