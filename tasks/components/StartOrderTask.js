import h from 'react-hyperscript'
import { isNil } from 'ramda'

import TaskStepper from './TaskStepper'
import SelectAgentForOrder from '../../agents/components/SelectAgentForOrder'

export default (props) => {
  const steps = [
    {
      id: 'tasks.steps.selectGroup',
      content: h(SelectAgentForOrder, {
        selectAgent: (agent) => { console.log('agent, ', agent)}
      })
    },
    {
      id: 'tasks.steps.selectSupplier',
      content: h(SelectAgentForOrder, {
        selectAgent: (agent) => { console.log('agent, ', agent)}
      })
    },
    {
      id: 'tasks.steps.selectAdmin',
      content: h(SelectAgentForOrder, {
        selectAgent: (agent) => { console.log('agent, ', agent)}
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}
