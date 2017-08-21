import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PriceEditor from '../components/PriceEditor'

storiesOf('supply.PriceEditor', module)
  .add('basic', () => (
    h(PriceEditor, {
      onSubmit: action('submit')
    })
  ))
