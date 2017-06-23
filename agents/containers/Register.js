import { connect as connectRedux } from 'react-redux'
import { connect as connectFeathers } from 'feathers-action-react'
import { flow } from 'lodash'

import { authentication } from 'dogstack-agents/actions'
const { register } = authentication
import { getRegisterProps } from 'dogstack-agents/getters'

import Register from '../components/Register'

export default flow(
  connectFeathers({
    selector: getRegisterProps,
    actions: { authentication: { register } },
    query: []
  })
)(Register)
