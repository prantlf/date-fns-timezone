/** @module date-fns */

import parse from 'date-fns/parse'
import { findTimeZone, getUTCOffset } from 'timezone-support'

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date from the specified time zone.
 *
 * @description
 * Parse the given argument to an instance of Date and convert it from the specified time zone to the local time.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * The time zone has to be specified as a canonical name from the [IANA time zone list]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} options - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @param {String} options.timeZone - the canonical name of the source time zone
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date, New York time:
 * var result = parseFromTimeZone('2014-02-11 11:30:30',
 *   { timeZone: 'America/New_York' })
 * //=> Tue Feb 11 2014 16:30:30 UTC
 *
 * @example
 * // Parse string '+02014101', if the additional number of digits
 * // in the extended year format is 1, Madrid time:
 * var result = parseFromTimeZone('+02014101',
 *   { additionalDigits: 1,  timeZone: 'Europe/Madrid' })
 * //=> Fri Apr 10 2014 22:00:00 UTC
 */
function parseFromTimeZone (argument, options) {
  let date = parse(argument, options)
  let { timeZone } = options
  timeZone = findTimeZone(timeZone)
  let { offset } = getUTCOffset(date, timeZone)
  offset -= date.getTimezoneOffset()
  date = new Date(date.valueOf() - offset * 60 * 1000)
  return date
}

export { parseFromTimeZone }
