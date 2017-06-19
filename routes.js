import { Route } from 'react-router-dom'
import React from 'react'

// Top Level Containers
import Home from './app/containers/home'

import {
  SignIn,
  SignOut,
  Register
} from 'dogstack-agents/components'
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  UserIsAuthenticatedOrHome
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
    navigation: {
      title: 'Sign in'
    }
  },
  {
    name: 'sign-in',
    path: '/sign-in',
    Component: UserIsNotAuthenticated(SignIn),
    navigation: {
      title: 'Sign in',
      selector: getIsNotAuthenticated
    }
  },
  {
    name: 'sign-out',
    path: '/sign-out',
    Component: UserIsAuthenticatedOrHome(SignOut),
    navigation: {
      title: 'Sign out',
      selector: getIsAuthenticated
    }
  },
  {
    name: 'register',
    path: '/register',
    Component: UserIsNotAuthenticated(Register),
    navigation: {
      title: 'Register',
      selector: getIsNotAuthenticated
    }
  }
]
