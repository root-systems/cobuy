import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Profile from '../../agents/components/Profile'

import TaskWorker from '../components/TaskWorker'

import { finishPrereqs, setupGroup, setupSupplier } from '../data/recipes'

const agent = {
  id: 1,
  profile: {
    name: 'Sam'
  }
}
const taskPlan = {
  id: 1,
  agent,
  taskRecipe: finishPrereqs,
  subTaskPlans: [
    {
      id: 2,
      agent,
      taskRecipe: setupGroup,
      taskWork: {
        id: 1,
        agent
      }
    },
    {
      id: 3,
      agent,
      taskRecipe: setupSupplier
    }
  ]
}

storiesOf('tasks.TaskWorker', module)
  .add('task tree (with sub-tasks)', () => (
    <TaskWorker
      taskPlan={taskPlan}
      onNavigate={action('navigate')}
      onComplete={action('complete')}
      onCancel={action('cancel')}
    />
  ))
  .add('leaf task, complete', () => (
    <TaskWorker
      taskPlan={taskPlan.subTaskPlans[0]}
      onNavigate={action('navigate')}
      onComplete={action('complete')}
      onCancel={action('cancel')}
    />
  ))
  .add('leaf task, not complete', () => (
    <TaskWorker
      taskPlan={taskPlan.subTaskPlans[1]}
      onNavigate={action('navigate')}
      onComplete={action('complete')}
      onCancel={action('cancel')}
    />
  ))
