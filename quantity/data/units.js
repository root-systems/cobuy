// taken from http://www.linkedmodel.org/doc/qudt-vocab-units/1.1/index.html
// > http://qudt.org/1.1/vocab/OVG_units-qudt-(v1.1).ttl

export const litre = {
  dimension: 'volume',
  name: 'litre',
  symbol: 'L'
}

export const kilogram = {
  dimension: 'mass',
  name: 'kilogram',
  symbol: 'kg'
}

// special dimensionless unit!
// https://en.wikipedia.org/wiki/Dimensionless_quantity
export const each = {
  dimension: null,
  name: 'each',
  symbol: 'each'
}
