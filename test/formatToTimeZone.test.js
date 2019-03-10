/* global describe, it, expect */

import formatToTimeZone from '../src/formatToTimeZone'

describe('formatToTimeZone', () => {
  it('is a function', () => {
    expect(typeof formatToTimeZone).toEqual('function')
  })

  it('formats a date string to the given time zone', () => {
    const date = new Date('2018-09-01T16:01:36.386Z')
    const format = 'D.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'
    const timeZone = 'Europe/Berlin'
    const expectedString = '1.9.2018 18:01:36.386 GMT+02:00 (CEST)'
    const actualString = formatToTimeZone(date, format, { timeZone })
    expect(actualString).toEqual(expectedString)
  })

  it('formats a date string to the given time zone without conversion', () => {
    const date = new Date(2018, 8, 1, 18, 1, 36, 386)
    const format = 'MM/DD/YYYY h:mm:ss.SSS A [GMT]ZZ (z)'
    const timeZone = 'Pacific/Honolulu'
    const expectedString = '09/01/2018 6:01:36.386 PM GMT-1000 (HST)'
    const actualString = formatToTimeZone(date, format, {
      timeZone,
      convertTimeZone: false
    })
    expect(actualString).toEqual(expectedString)
  })
})
