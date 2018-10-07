import {
  convertToLocalTime, convertToTimeZone, parseFromString, parseFromTimeZone, formatToTimeZone
} from '..'

declare function test (label: string, callback: Function)

test('TypeScript Type Information', () => {
  const timestamp = 1538822326765
  const date = new Date(timestamp)
  const dateString = '2018-10-06T10:38:46.765Z'
  const customDateString = '6.10.2018 12:38:46.765'
  const customFormat = 'D.M.YYYY H:mm:ss.SSS'
  const timeZoneOptions = { timeZone: 'Europe/Berlin' }

  convertToLocalTime(date, timeZoneOptions)
  convertToLocalTime(dateString, timeZoneOptions)
  convertToLocalTime(timestamp, timeZoneOptions)

  convertToTimeZone(date, timeZoneOptions)
  convertToTimeZone(dateString, timeZoneOptions)
  convertToTimeZone(timestamp, timeZoneOptions)

  parseFromString(customDateString, customFormat)

  parseFromTimeZone(customDateString, customFormat, timeZoneOptions)
  parseFromTimeZone(dateString, timeZoneOptions)

  formatToTimeZone(date, customFormat, timeZoneOptions)
  formatToTimeZone(dateString, customFormat, timeZoneOptions)
  formatToTimeZone(timestamp, customFormat, timeZoneOptions)
})
