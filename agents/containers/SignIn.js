import { bindActionCreators } from 'redux'
import { connect as connectRedux } from 'react-redux'
import { connect as connectFeathers } from 'feathers-action-react'
import { assign, flow } from 'lodash'
import { push } from 'react-router-redux'

import { authentication } from 'dogstack-agents/actions'
const { signIn } = authentication
import { getSignInProps } from 'dogstack-agents/getters'

import SignIn from '../components/SignIn'

export default flow(
  // we want to pass router.push action down.
  // can't use connect feathers because that
  // wraps every action creator in a cid creator.
  // TODO fix this.
  connectRedux(
    null,
    (dispatch, props) => assign({}, props, {
      actions: assign({}, props.actions, {
        router: bindActionCreators({ push }, dispatch)
      })
    })
  ),
  connectFeathers({
    selector: getSignInProps,
    actions: { authentication: { signIn } },
    query: []
  })
)(SignIn)
