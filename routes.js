import { Route } from 'react-router-dom'

// Top Level Containers
import Home from './app/containers/Home'
import Invited from './agents/containers/Invited'
import TasksPage from './tasks/containers/TasksPage'
import TaskWorker from './tasks/containers/TaskWorker'
import OrdersPage from './ordering/containers/OrdersPage'
import OrderPage from './ordering/containers/OrderPage'
import OrderSummary from './ordering/containers/OrderSummary'

import {
  Register,
  SignIn,
  LogOut
} from 'dogstack-agents/components'
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from 'dogstack-agents/hoc'
import {
  getIsAuthenticated,
  getIsNotAuthenticated
} from 'dogstack-agents/getters'

export default [
  {
    name: 'home',
    path: '/',
    exact: true,
    Component: Home,
    selector: getIsNotAuthenticated,
    navigation: {
      title: 'app.home',
      icon: 'fa fa-home'
    }
  },
  {
    name: 'orders',
    path: '/',
    exact: true,
    Component: OrdersPage,
    selector: getIsAuthenticated,
    navigation: {
      title: 'app.orders',
      icon: 'fa fa-shopping-basket'
    }
  },
  {
    name: 'order',
    path: '/o/:orderId',
    Component: OrderPage,
    selector: getIsAuthenticated
  },
  {
    name: 'signIn',
    path: '/sign-in',
    Component: UserIsNotAuthenticated(SignIn),
    navigation: {
      title: 'agents.signIn',
      selector: getIsNotAuthenticated,
      icon: 'fa fa-sign-in'
    }
  },
  {
    name: 'logOut',
    navigation: {
      Component: LogOut,
      selector: getIsAuthenticated,
      icon: 'fa fa-sign-out'
    }
  },
  {
    name: 'register',
    path: '/register',
    Component: UserIsNotAuthenticated(Register),
    navigation: {
      title: 'agents.register',
      selector: getIsNotAuthenticated,
      icon: 'fa fa-heart'
    }
  },
  {
    name: 'invited',
    path: '/invited/:jwt',
    Component: UserIsNotAuthenticated(Invited)
  },
  {
    name: 'tasks',
    path: '/tasks',
    exact: true,
    Component: UserIsAuthenticated(TasksPage),
    navigation: {
      title: 'tasks.tasks',
      selector: getIsAuthenticated,
      icon: 'fa fa-check-circle'
    }
  },
  {
    name: 'task',
    path: '/tasks/:taskPlanId',
    Component: UserIsAuthenticated(TaskWorker)
  },
  {
    name: 'orderSummary',
    path: '/ordersummary',
    Component: OrderSummary
  }
]
