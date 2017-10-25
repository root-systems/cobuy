import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getConfig from './getConfig'
import getRoutes from './getRoutes'
import getNavigationRoutes from './getNavigationRoutes'

const getLayoutProps = createStructuredSelector({
  config: getConfig,
  currentAgent: getCurrentAgent,
  routes: getRoutes,
  navigationRoutes: getNavigationRoutes
})

export default getLayoutProps
