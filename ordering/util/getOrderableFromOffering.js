export default function getOrderableFromOffering (offering) {
  return getOrderableFromResourceType(offering.resourceType)
}

function getOrderableFromResourceType (resourceType, quantity = {}) {
  const { items } = resourceType

  if (items) {
    // assume first item is what you "order"
    const item = items[0]
    const {
      resourceType: itemResourceType,
      quantity: itemQuantity
    } = item
    return getOrderableFromResourceType(itemResourceType, itemQuantity)
  }

  const {
    unit = 'each',
    step = '1'
  } = quantity

  return {
    resourceType,
    unit,
    step
  }
}
