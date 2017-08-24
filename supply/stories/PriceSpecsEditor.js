import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PriceSpecsEditor from '../components/PriceSpecsEditor'

storiesOf('supply.PriceSpecsEditor', module)
  .add('basic', () => (
    h(PriceSpecsEditor, {
      onSubmit: action('submit')
    })
  ))
