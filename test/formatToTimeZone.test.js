/* global describe, it, expect */

import { formatToTimeZone } from '../src/formatToTimeZone'

const date = new Date('2018-09-01T16:01:36.386Z')
const format = 'D.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'

describe('formatToTimeZone', () => {
  it('is a function', () => {
    expect(typeof formatToTimeZone).toEqual('function')
  })

  it('formats a date string to the given time zone', () => {
    const timeZone = 'Europe/Berlin'
    const expectedString = '1.9.2018 18:01:36.386 GMT+02:00 (CEST)'
    const actualString = formatToTimeZone(date, format, { timeZone })
    expect(actualString).toEqual(expectedString)
  })

  it('formats a date string to the given time zone without conversion', () => {
    const zonedDate = new Date(2018, 8, 1, 18, 1, 36, 386)
    const timeZone = 'Europe/Berlin'
    const expectedString = '1.9.2018 18:01:36.386 GMT+02:00 (CEST)'
    const actualString = formatToTimeZone(zonedDate, format, { timeZone, convertTimeZone: false })
    expect(actualString).toEqual(expectedString)
  })

  it('formats a compact time zone offset', () => {
    const timeZone = 'Pacific/Honolulu'
    const expectedString = '-1000'
    const actualString = formatToTimeZone(date, 'ZZ', { timeZone })
    expect(actualString).toEqual(expectedString)
  })
})
