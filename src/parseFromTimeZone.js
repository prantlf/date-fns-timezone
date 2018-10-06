/** @module date-fns */

import parse from 'date-fns/parse'
import { findTimeZone, getUTCOffset, getUnixTime } from 'timezone-support'
import { parseZonedTime } from 'timezone-support/dist/parse-format'

/**
 * @category Common Helpers
 * @summary Parse the date string and convert it from the specified time zone to the local time.
 *
 * @description
 * Returns the date parsed from the date string, optionally using the given format string, and convert the parsed date from the given time zone to the local time.
 *
 * If the format string is omitted, the date string will be parsed by `date-fns/parse`, which supports extended ISO 8601 formats.
 *
 * The following tokens are recognized in the format string:
 *
 * | Token  | Input example    | Description                       |
 * |--------|------------------|-----------------------------------|
 * | `YY`   | 18               | Two-digit year                    |
 * | `YYYY` | 2018             | Four-digit year                   |
 * | `M`    | 1-12             | Month, beginning at 1             |
 * | `MM`   | 01-12            | Month, 2-digits                   |
 * | `D`    | 1-31             | Day of month                      |
 * | `DD`   | 01-31            | Day of month, 2-digits            |
 * | `H`    | 0-23             | Hours                             |
 * | `HH`   | 00-23            | Hours, 2-digits                   |
 * | `h`    | 1-12             | Hours, 12-hour clock              |
 * | `hh`   | 01-12            | Hours, 12-hour clock, 2-digits    |
 * | `m`    | 0-59             | Minutes                           |
 * | `mm`   | 00-59            | Minutes, 2-digits                 |
 * | `s`    | 0-59             | Seconds                           |
 * | `ss`   | 00-59            | Seconds, 2-digits                 |
 * | `S`    | 0-9              | Hundreds of milliseconds, 1-digit |
 * | `SS`   | 00-99            | Tens of milliseconds, 2-digits    |
 * | `SSS`  | 000-999          | Milliseconds, 3-digits            |
 * | `z`    | EST              | Time zone abbreviation            |
 * | `Z`    | -5:00            | Offset from UTC, 2-digits         |
 * | `ZZ`   | -0500            | Compact offset from UTC, 2-digits |
 * | `A`    | AM PM            | Post or ante meridiem, upper-case |
 * | `a`    | am pm            | Post or ante meridiem, lower-case |
 *
 * To escape characters in the format string, wrap them in square brackets (e.g. `[G]`). Punctuation symbols (-:/.()) do not need to be wrapped.
 *
 * The time zone has to be specified as a canonical name from the [IANA time zone list]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}.
 *
 * @param {String} dateString - the string to parse
 * @param {String} [formatString] - the custom format to parse the date from
 * @param {Object} options - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @param {String} options.timeZone - the canonical name of the source time zone
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Parse string '2014-02-11 11:30:30 AM' to date, New York time:
 * const result = parseFromTimeZone('2014-02-11 11:30:30',
 *   { timeZone: 'America/New_York' })
 * // Returns Tue Feb 11 2014 16:30:30 UTC
 *
 * @example
 * // Parse string '11.2.2014 11:30:30' to date, Berlin time:
 * const result = parseFromTimeZone('11.2.2014 11:30:30',
 *   'D.M.YYYY H:mm:ss', { timeZone: 'Europe/Berlin' })
 * // Returns Tue Feb 11 2014 10:30:30 UTC
 *
 * @example
 * // Parse string '+02014101', if the additional number of digits
 * // in the extended year format is 1, Madrid time:
 * var result = parseFromTimeZone('+02014101',
 *   { additionalDigits: 1, timeZone: 'Europe/Madrid' })
 * //=> Fri Apr 10 2014 22:00:00 UTC
 */
function parseFromTimeZone (dateString, formatString, options) {
  if (typeof formatString !== 'string') {
    options = formatString
    formatString = undefined
  }
  let { timeZone } = options
  timeZone = findTimeZone(timeZone)
  if (formatString) {
    const time = parseZonedTime(dateString, formatString)
    const unixTime = getUnixTime(time, timeZone)
    return new Date(unixTime)
  }
  const date = parse(dateString, options)
  let { offset } = getUTCOffset(date, timeZone)
  offset -= date.getTimezoneOffset()
  return new Date(date.getTime() + offset * 60 * 1000)
}

export { parseFromTimeZone }
