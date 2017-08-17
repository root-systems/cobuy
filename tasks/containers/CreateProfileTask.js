import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { profiles } from 'dogstack-agents/actions'

import getCreateProfileTaskProps from '../getters/getCreateProfileTaskProps'
import CreateProfileTask from '../components/CreateProfileTask'

export default compose(
  connectFeathers({
    selector: getCreateProfileTaskProps,
    actions: {
      profiles
    },
    query: (props) => {
      return []
    }
  })
)(CreateProfileTask)
