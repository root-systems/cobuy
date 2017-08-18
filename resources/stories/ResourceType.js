import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ResourceType from '../components/ResourceType'

storiesOf('resources.ResourceType', module)
  .add('basic', () => (
    h(ResourceType, {
      onSubmit: action('submit')
    })
  ))
