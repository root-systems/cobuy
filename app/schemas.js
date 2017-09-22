const Ajv = require('ajv')
const ajv = new Ajv()

const taskPlanSchema = require('../tasks/schemas/taskPlan')
const taskRecipeSchema = require('../tasks/schemas/taskRecipe')
const tokenSchema = require('../tokens/schemas/token')
const tokenConsumeSchema = require('../tokens/schemas/tokenConsume')

ajv.addSchema([
  taskRecipeSchema,
  taskPlanSchema,
  tokenSchema,
  tokenConsumeSchema
])

export default ajv
