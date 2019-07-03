/* global describe, it, expect */

import parseFromString from '../src/parseFromString'

describe('parseFromString', () => {
  it('is a function', () => {
    expect(typeof parseFromString).toEqual('function')
  })

  it('parses a date string in the local time zone', () => {
    const dateString = '1.9.2018 18:01:36.386'
    const formatString = 'D.M.YYYY HH:mm:ss.SSS'
    const expectedDate = new Date(2018, 8, 1, 18, 1, 36, 386)
    const actualDate = parseFromString(dateString, formatString)
    expect(actualDate).toEqual(expectedDate)
  })

  it('parses a date string in other time zone', () => {
    const dateString = '09/01/2018 6:01:36.386 AM GMT-1000 (HST)'
    const formatString = 'MM/DD/YYYY h:mm:ss.SSS A [GMT]ZZ (z)'
    const expectedDate = new Date(Date.UTC(2018, 8, 1, 16, 1, 36, 386))
    const actualDate = parseFromString(dateString, formatString)
    expect(actualDate).toEqual(expectedDate)
  })
})
