import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { authentication } from 'dogstack-agents/actions'
// import getInvitedProps from '../getters/getInvitedProps'
import Invited from '../components/Invited'

import { invitedPatchPassword } from '../dux/agents'

export default compose(
  connectFeathers({
    selector: (state) => state,
    actions: {
      invited: { invitedPatchPassword }
    },
    query: []
  })
)(Invited)
