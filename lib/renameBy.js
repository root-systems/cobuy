import { curry, pipe, toPairs, map, adjust, fromPairs } from 'ramda'

const renameBy = curry((fn, obj) => pipe(toPairs, map(adjust(fn, 0)), fromPairs)(obj))

export default renameBy
