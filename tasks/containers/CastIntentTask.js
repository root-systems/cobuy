import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getCastIntentTaskProps from '../getters/getCastIntentTaskProps'
import CastIntentTask from '../components/CastIntentTask'

export default compose(
  connectFeathers({
    selector: getCastIntentTaskProps,
    actions: {
    },
    query: (props) => {
      return []
    }
  })
)(CastIntentTask)
