/* global describe, it, expect */

import parseFromTimeZone from '../src/parseFromTimeZone'

describe('parseFromTimeZone', () => {
  it('is a function', () => {
    expect(typeof parseFromTimeZone).toEqual('function')
  })

  it('parses a date string from one given time zone', () => {
    const dateString = '2018-09-01 18:01:36.386'
    const timeZone = 'Europe/Berlin'
    const expectedDate = new Date(Date.UTC(2018, 8, 1, 16, 1, 36, 386))
    const actualDate = parseFromTimeZone(dateString, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })

  it('parses a custom-formatted date string in other time zone', () => {
    const dateString = '09/01/2018 6:01:36.386 AM'
    const formatString = 'MM/DD/YYYY h:mm:ss.SSS A'
    const timeZone = 'Pacific/Honolulu'
    const expectedDate = new Date(Date.UTC(2018, 8, 1, 16, 1, 36, 386))
    const actualDate = parseFromTimeZone(dateString, formatString, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })
})
