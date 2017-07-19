import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getRoutes from './getRoutes'
import getNavigationRoutes from './getNavigationRoutes'

const getLayoutProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  routes: getRoutes,
  navigationRoutes: getNavigationRoutes
})

export default getLayoutProps
