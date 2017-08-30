const Ajv = require('ajv')
const ajv = new Ajv()

const taskPlanSchema = require('../tasks/schemas/taskPlan')
const taskRecipeSchema = require('../tasks/schemas/taskRecipe')
ajv.addSchema([
  taskRecipeSchema,
  taskPlanSchema
])

export default ajv
