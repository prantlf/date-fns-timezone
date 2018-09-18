/* global describe, it, expect */

import { convertToLocalTime } from '../src/convertToLocalTime'

describe('convertToLocalTime', () => {
  it('is a function', () => {
    expect(typeof convertToLocalTime).toEqual('function')
  })

  it('changes the date from the given time zone to the local time', () => {
    const originalDate = new Date(2018, 8, 1, 18, 1, 36, 386)
    const timeZone = 'Europe/Berlin'
    const expectedDate = new Date('2018-09-01T16:01:36.386Z')
    const actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })
})
