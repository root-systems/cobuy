import h from 'react-hyperscript'
import { isNil } from 'ramda'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'

export default (props) => {
  const steps = [
    {
      id: 'tasks.steps.selectGroup',
      content: h('div', {

      }, 'select group')
    },
    {
      id: 'tasks.steps.selectSupplier',
      content: h('div', {

      }, 'select supplier')
    },
    {
      id: 'tasks.steps.selectAdmin',
      content: h('div', {

      }, 'select admin')
    }
  ]

  return h(TaskStepper, {
    steps
  })
}
