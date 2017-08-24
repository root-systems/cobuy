import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ResourceTypeEditor from '../components/ResourceTypeEditor'

const resourceTypes = {
  1: { id: 1, name: 'egg' },
  2: { id: 2, name: 'carton' }
}

const nestedResourceType = {
  id: 3,
  name: 'carton of eggs',
  items: [
    {
      quantity: {
        value: '1',
        unit: 'each'
      },
      resourceTypeId: 2
    },
    {
      quantity: {
        value: '12',
        unit: 'each'
      },
      resourceTypeId: 1
    }
  ]
}


storiesOf('resources.ResourceTypeEditor', module)
  .add('empty', () => (
    h(ResourceTypeEditor, {
      onSubmit: action('submit'),
      resourceTypes
    })
  ))
  .add('simple', () => (
    h(ResourceTypeEditor, {
      onSubmit: action('submit'),
      resourceType: resourceTypes[1],
      resourceTypes
    })
  ))
  .add('nested', () => (
    h(ResourceTypeEditor, {
      onSubmit: action('submit'),
      resourceType: nestedResourceType,
      resourceTypes
    })
  ))
