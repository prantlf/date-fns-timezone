/** @module date-fns */

import parse from 'date-fns/parse'
import { findTimeZone, getUTCOffset } from 'timezone-support'

/**
 * @category Common Helpers
 * @summary Convert the date from the given time zone to the local time.
 *
 * @description
 * Converts the given date from the given time zone to the local time and returns it as a new `Date` object.
 * Getters for local time parts of the input `Date` object (getFullYear, getMonth, ...) will be assumed to
 * return time in the given time zone.
 *
 * The time zone has to be specified as a canonical name from the [IANA time zone list]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} options - the object with options
 * @param {String} options.timeZone - the canonical name of the source time zone
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert the current time to the New York time zone:
 * var result = convertToLocalTime(new Date(), { timeZone: 'America/New_York' })
 * //=> { date: Date, zone: { abbreviation: 'EST', offset: -300 }
 */
function convertToLocalTime (argument, options) {
  let date = parse(argument)
  const timeZone = findTimeZone(options.timeZone)
  let { offset } = getUTCOffset(date, timeZone)
  offset = date.getTimezoneOffset() - offset
  return new Date(date.valueOf() - offset * 60 * 1000)
}

export { convertToLocalTime }
