/* global describe, it, expect */

import { convertToLocalTime } from '../src/convertToLocalTime'

describe('convertToLocalTime', () => {
  it('is a function', () => {
    expect(typeof convertToLocalTime).toEqual('function')
  })

  it('changes the date from one given time zone to the local time', () => {
    const originalDate = new Date(2018, 8, 1, 18, 1, 36, 386)
    const timeZone = 'Europe/Berlin'
    const expectedDate = new Date('2018-09-01T16:01:36.386Z')
    const actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })

  it('changes the date from other given time zone to the local time', () => {
    const originalDate = new Date(2018, 8, 1, 6, 1, 36, 386)
    const timeZone = 'Pacific/Honolulu'
    const expectedDate = new Date('2018-09-01T16:01:36.386Z')
    const actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })

  it('changes the date from a distant time zone to the local time', () => {
    // This test depends on what local TZ it is being executed in!!!
    // The local TZ has to be at least 1 hour closer to UTC than Melbourne and Adak
    // The TZ where this has been confirmed was UTC+3 (Europe/Sofia)

    let timeZone, originalDate, expectedDate, actualDate

    // first check the conversion to the east
    timeZone = 'Australia/Melbourne'

    // to DST in October - on 1-Oct-2023 at 02:00:00 A.M.
    // this test shall always pass just fine because both moments are before the DST switch
    originalDate = new Date(2023, 8, 28, 0, 0, 0, 0)
    expectedDate = new Date('2023-09-27T14:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // this test shall fail without the fix because the initial moment is before the DST switch and the target moment is after
    originalDate = new Date(2023, 9, 1, 0, 0, 0, 0)
    expectedDate = new Date('2023-09-30T14:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // this test shall always pass just fine because both moments are after the DST switch
    originalDate = new Date(2023, 9, 1, 3, 0, 0, 0)
    expectedDate = new Date('2023-09-30T16:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // and back in April - on 2-April-2023 at 03:00:00 A.M.
    // this test shall always pass just fine because both moments are before the DST switch
    originalDate = new Date(2023, 3, 1, 0, 0, 0, 0)
    expectedDate = new Date('2023-03-31T13:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // this test shall fail without the fix because the initial moment is before the DST switch and the target moment is after
    originalDate = new Date(2023, 3, 2, 0, 0, 0, 0)
    expectedDate = new Date('2023-04-01T13:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // this test shall always pass just fine because both moments are after the DST switch
    originalDate = new Date(2023, 3, 2, 3, 0, 0, 0)
    expectedDate = new Date('2023-04-01T17:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // now check the conversion to the west
    timeZone = 'America/Adak'

    // to DST in March - on 12-Mar-2023 at 02:00:00 A.M.
    // this test shall always pass just fine because both moments are before the DST switch
    originalDate = new Date(2023, 2, 10, 0, 0, 0, 0)
    expectedDate = new Date('2023-03-10T10:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // this test shall fail without the fix because the initial moment is before the DST switch and the target moment is after
    originalDate = new Date(2023, 2, 12, 4, 0, 0, 0)
    expectedDate = new Date('2023-03-12T13:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // this test shall always pass just fine because both moments are after the DST switch
    originalDate = new Date(2023, 2, 14, 0, 0, 0, 0)
    expectedDate = new Date('2023-03-14T09:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // and back in November - on 5-Nov-2023 at 03:00:00 A.M.
    originalDate = new Date(2023, 10, 5, 0, 0, 0, 0)
    expectedDate = new Date('2023-11-05T09:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // this test shall fail without the fix because the initial moment is before the DST switch and the target moment is after
    originalDate = new Date(2023, 10, 5, 4, 0, 0, 0)
    expectedDate = new Date('2023-11-05T14:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)

    // this test shall always pass just fine because both moments are after the DST switch
    originalDate = new Date(2023, 10, 10, 0, 0, 0, 0)
    expectedDate = new Date('2023-11-10T10:00:00.000Z')
    actualDate = convertToLocalTime(originalDate, { timeZone })
    expect(actualDate).toEqual(expectedDate)
  })
})
