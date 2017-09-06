import h from 'react-hyperscript'
import { isNil, merge, isEmpty } from 'ramda'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'
import ProductListEditor from '../../supply/components/ProductListEditor'

export default (props) => {
  const { taskPlan, actions, products } = props
  if (isNil(taskPlan)) return null
  const { params: { supplierAgent } } = taskPlan
  if (isNil(supplierAgent)) return null

  const { profile } = supplierAgent

  const steps = [
    {
      id: 'tasks.steps.supplierProfile',
      content: h(Profile, {
        initialValues: profile,
        updateProfile: (nextProfile) => {
          actions.profiles.update(profile.id, merge(nextProfile, { agentId: supplierAgent.id }))
        }
      })
    },
    {
      id: 'tasks.steps.supplierProducts',
      content: h(ProductListEditor, {
        products,
        createProduct: () => {
          actions.products.create({
            supplierAgentId: supplierAgent.id
          })
        },
        updateResourceType: (resourceType) => {
          actions.resourceTypes.update(resourceType.id, resourceType)
        },
        savePriceSpecs: (productId, priceSpecs) => {
          priceSpecs.forEach(priceSpec => {
            const nextPriceSpec = merge(priceSpec, { productId })
            if (nextPriceSpec.id) {
              actions.priceSpecs.update(nextPriceSpec.id, nextPriceSpec)
            } else {
              actions.priceSpecs.create(nextPriceSpec)
            }
          })
        }
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}
