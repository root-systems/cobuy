import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { profiles } from 'dogstack-agents/actions'

import getStartOrderTaskProps from '../getters/getStartOrderTaskProps'
import StartOrderTask from '../components/StartOrderTask'

export default compose(
  connectFeathers({
    selector: getStartOrderTaskProps,
    actions: {
      // profiles
    },
    query: (props) => {
      return []
    }
  })
)(StartOrderTask)
