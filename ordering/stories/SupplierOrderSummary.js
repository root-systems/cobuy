import React from 'react'
import { storiesOf } from '@storybook/react'
import order from './mock/order'

import SupplierOrderSummary from '../components/SupplierOrderSummary'

storiesOf('ordering.supplierOrderSummary', module)
  .add('default', () => (
    <SupplierOrderSummary order={order} />
  ))
