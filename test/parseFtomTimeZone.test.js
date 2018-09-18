/* global describe, it, expect */

import { parseFromTimeZone } from '../src/parseFromTimeZone'

describe('parseFromTimeZone', () => {
  it('is a function', () => {
    expect(typeof parseFromTimeZone).toEqual('function')
  })

  it('parses a date string from the given time zone', () => {
    const dateString = '2018-09-01 18:01:36.386'
    const timeZone = 'Europe/Berlin'
    const expectedDate = new Date(2018, 8, 1, 18, 1, 36, 386)
    const actualDate = parseFromTimeZone(dateString, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })
})
