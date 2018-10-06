/** @module date-fns */

import parseDate from 'date-fns/parse'
import formatDate from 'date-fns/format'
import { findTimeZone, getUTCOffset } from 'timezone-support'

/**
 * @category Common Helpers
 * @summary Format the date in the specified time zone.
 *
 * @description
 * Returns the formatted date string in the given format, after converting it to the given time zone.
 *
 * The input date will be converted to the given time zone by default, using its UTC timestamp.
 * If the local time in the input date is already in the given time zone, set `options.convertTimeZone`
 * to `false`. Otherwise the date will be considered in local time and converted.
 *
 * The time zone has to be specified as a canonical name from the [IANA time zone list]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}.
 *
 * The following tokens are recognized in the format string:
 *
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone abbreviation   | z     | CET, CEST, EST, EDT, ...         |
 * | Timezone offset to UTC  | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} argument - the original date
 * @param {String} formatString - the string of formatting tokens
 * @param {Object} options - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @param {String} options.timeZone - the canonical name of the target time zone
 * @param {String} [options.convertTimeZone=true] - if the date should be converted to the given time zone before formatting
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent midnight on 11 February 2014, UTC in middle-endian format, New York time:
 * var result = formatToTimeZone(
 *   new Date(Date.UTC(2014, 1, 11)),
 *   'MM/dd/yyyy h:mm A [GMT]Z (z)',
 *   { timeZone: 'America/New_York' }
 * )
 * // Returns '02/10/2014 7:00 PM GMT-0500 (EST)'
 *
 * @example
 * // Represent noon on 2 July 2014 in Esperanto, Madrid time:
 * var locale = require('date-fns/locale/eo')
 * var result = formatToTimeZone(
 *   new Date(2014, 6, 2, 12),
 *   "HH:mm, do 'de' MMMM yyyy (Zz)",
 *   { locale, timeZone: 'Europe/Madrid', convertTimeZone: false }
 * )
 * // Returns '12:00, 2-a de julio 2014 (+02:00 CEST)'
 */
function formatToTimeZone (argument, formatString, options) {
  let date = parseDate(argument)
  let { timeZone, convertTimeZone } = options
  timeZone = findTimeZone(timeZone)
  timeZone = getUTCOffset(date, timeZone)
  if (convertTimeZone !== false) {
    const offset = timeZone.offset - date.getTimezoneOffset()
    date = new Date(date.getTime() - offset * 60 * 1000)
  }
  formatString = formatTimeZoneTokens(formatString, timeZone)
  return formatDate(date, formatString, options)
}

function padToTwoDigits (number) {
  return number > 9 ? number : `0${number}`
}

function formatTimeZoneOffset (offset, separator) {
  let sign
  if (offset <= 0) {
    offset = -offset
    sign = '+'
  } else {
    sign = '-'
  }
  const hours = padToTwoDigits(Math.floor(offset / 60))
  const minutes = padToTwoDigits(offset % 60)
  return sign + hours + separator + minutes
}

function formatTimeZoneTokens (format, timeZone) {
  return format.replace(/z|ZZ?/g, match => {
    switch (match) {
      case 'z':
        return `[${timeZone.abbreviation}]`
      case 'Z':
        return formatTimeZoneOffset(timeZone.offset, ':')
      default: // 'ZZ'
        return formatTimeZoneOffset(timeZone.offset, '')
    }
  })
}

export { formatToTimeZone }
