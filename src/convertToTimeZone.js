/** @module date-fns */

import parse from 'date-fns/parse'
import { findTimeZone, getUTCOffset } from 'timezone-support'

/**
 * @category Common Helpers
 * @summary Convert the date from the local time to the given time zone.
 *
 * @description
 * Converts the given date from the local time to the given time zone and returns a new `Date` object, which has its local time set to it.
 * The returned `Date` object should not be used form comparisons or other computations. Only the its getters for the
 * local time parts can be used (getFullYear, getMonth, ...).
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
 * var result = convertToTimeZone(new Date(), { timeZone: 'America/New_York' })
 * //=> { date: Date, zone: { abbreviation: 'EST', offset: -300 }
 */
function convertToTimeZone (argument, options) {
  let date = parse(argument)
  const timeZone = findTimeZone(options.timeZone)
  let { offset } = getUTCOffset(date, timeZone)
  offset -= date.getTimezoneOffset()
  return new Date(date.valueOf() - offset * 60 * 1000)
}

export { convertToTimeZone }
