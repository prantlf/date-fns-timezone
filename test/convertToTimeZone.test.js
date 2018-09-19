/* global describe, it, expect */

import { convertToTimeZone } from '../src/convertToTimeZone'

describe('convertToTimeZone', () => {
  it('is a function', () => {
    expect(typeof convertToTimeZone).toEqual('function')
  })

  it('converts the date from the local time to one given time zone', () => {
    const originalDate = new Date('2018-09-01T16:01:36.386Z')
    const timeZone = 'Europe/Berlin'
    const expectedDate = new Date(2018, 8, 1, 18, 1, 36, 386)
    const actualDate = convertToTimeZone(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })

  it('converts the date from the local time to other given time zone', () => {
    const originalDate = new Date('2018-09-01T16:01:36.386Z')
    const timeZone = 'Pacific/Honolulu'
    const expectedDate = new Date(2018, 8, 1, 6, 1, 36, 386)
    const actualDate = convertToTimeZone(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })
})
