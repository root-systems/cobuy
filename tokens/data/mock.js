const jsf = require('json-schema-faker')
const { indexBy, prop, assoc } = require('ramda')

const tokenSchema = require('../schemas/token')
const tokenConsumeSchema = require('../schemas/tokenConsume')

const refs = [tokenSchema, tokenConsumeSchema]

const tokenOne = jsf(tokenSchema, refs)
const tokenOneConsumes = [
  jsf(tokenConsumeSchema, refs),
  jsf(tokenConsumeSchema, refs),
  jsf(tokenConsumeSchema, refs)
].map(assoc('tokenId', tokenOne.id))

const tokenTwo = jsf(tokenSchema, refs)
const tokenTwoConsumes = [
  jsf(tokenConsumeSchema, refs),
  jsf(tokenConsumeSchema, refs)
].map(assoc('tokenId', tokenTwo.id))

const tokenThree = jsf(tokenSchema, refs)
const tokenThreeConsumes = [
  jsf(tokenConsumeSchema, refs)
].map(assoc('tokenId', tokenThree.id))

const indexById = indexBy(prop('id'))

exports.tokens = indexBy([tokenOne, tokenTwo, tokenThree])
exports.consumesByToken = {
  [tokenOne.id]: tokenOneConsumes,
  [tokenTwo.id]: tokenTwoConsumes,
  [tokenThree.id]: tokenThreeConsumes
}
exports.tokenConsumes = indexBy([...tokenOneConsumes, ...tokenTwoConsumes, ...tokenThreeConsumes])
