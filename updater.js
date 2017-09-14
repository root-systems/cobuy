import { concat } from 'redux-fp'

import { updater as agents } from 'dogstack-agents'
import { updater as taskPlans } from './tasks/dux/plans'
import { updater as taskWorks } from './tasks/dux/works'
import { updater as orders } from './ordering/dux/orders'
import taskRecipes from './tasks/updaters/recipes'
import { updater as products } from './supply/dux/products'
import { updater as priceSpecs } from './supply/dux/priceSpecs'
import { updater as resourceTypes } from './resources/dux/resourceTypes'

export default concat(
  agents,
  orders,
  taskPlans,
  taskWorks,
  taskRecipes,
  products,
  priceSpecs,
  resourceTypes
)
