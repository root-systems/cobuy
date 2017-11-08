import { isNil, path, isEmpty } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getViewOrderSummaryTaskProps from '../getters/getViewOrderSummaryTaskProps'
import ViewOrderSummaryTask from '../components/ViewOrderSummaryTask'

export default compose(

  connectFeathers({
    selector: getViewOrderSummaryTaskProps,
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
)(ViewOrderSummaryTask)
