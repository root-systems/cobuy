import { connect as connectRedux } from 'react-redux'
import { connect as connectFeathers } from 'feathers-action-react'
import { flow } from 'lodash'
import { push } from 'react-router-redux'

import { authentication } from 'dogstack-agents/actions'
const { logOut } = authentication

import LogOut from '../components/LogOut'

export default flow(
  connectFeathers({
    selector: (state) => ({}),
    actions: { authentication: { logOut } },
    query: []
  })
)(LogOut)
