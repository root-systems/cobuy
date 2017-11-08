import { isNil, path, isEmpty } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getCloseOrderTaskProps from '../getters/getCloseOrderTaskProps'
import CloseOrderTask from '../components/CloseOrderTask'

export default compose(

  connectFeathers({
    selector: getCloseOrderTaskProps,
    actions: {
    },
    query: (props) => {
      var queries = []
      return queries
    },
    shouldQueryAgain: (props, status) => {
      return false
    }
  })
)(CloseOrderTask)
