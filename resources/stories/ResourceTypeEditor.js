import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ResourceTypeEditor from '../components/ResourceTypeEditor'

storiesOf('resources.ResourceTypeEditor', module)
  .add('basic', () => (
    h(ResourceTypeEditor, {
      onSubmit: action('submit')
    })
  ))
