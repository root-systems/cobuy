import { Route } from 'react-router-dom'
import React from 'react'

// Top Level Containers
import Home from './app/containers/home'

import Register from './agents/containers/Register'
import SignIn from './agents/containers/SignIn'
import LogOut from './agents/containers/LogOut'

import {
  SignOut
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
      title: 'Home'
    }
  },
  {
    name: 'signIn',
    path: '/sign-in',
    Component: UserIsNotAuthenticated(SignIn),
    navigation: {
      title: 'Sign in',
      selector: getIsNotAuthenticated
    }
  },
  {
    name: 'logOut',
    navigation: {
      Link: LogOut,
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
