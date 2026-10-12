export const CHARGE_TYPES = {
  DISTANCE: 0,
  TIME: 1,
}

const CHARGE_TYPE_UNIT = {
  [CHARGE_TYPES.DISTANCE]: 'km',
  [CHARGE_TYPES.TIME]: 'minuut',
}

const currency = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

export function formatRate(taxi) {
  return `${currency.format(Number(taxi.rate))} per ${CHARGE_TYPE_UNIT[taxi.charge_type]}`
}
