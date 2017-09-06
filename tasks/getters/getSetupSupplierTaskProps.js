import { createStructuredSelector } from 'reselect'
import getCurrentSupplierProducts from '../../supply/getters/getCurrentSupplierProducts'

export default createStructuredSelector({
  products: getCurrentSupplierProducts
})
