/** @module date-fns */

import { parseZonedTime } from 'timezone-support/dist/parse-format'
import { convertTimeToDate } from 'timezone-support/dist/lookup-convert'

/**
 * @category Common Helpers
 * @summary Parse the date string and convert it to the local time.
 *
 * @description
 * Return the date parsed from the date string, using the given format string, and convert the parsed date to the local time.
 *
 * The following tokens will be recognized in the format string then:
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
 * @param {String} dateString - the value to convert
 * @param {String} formatString - the custom format to parse the date from
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Parse string '11.2.2014 11:30:30' to date in Berlin:
 * var result = parseFromTimeZone('11.2.2014 11:30:30', 'D.M.YYYY H:mm:ss')
 * //=> Tue Feb 11 2014 10:30:30 UTC
 *
 * // Parse string '02/11/2014 11:30:30' to date, New York time:
 * var result = parseFromString('02/11/2014 11:30:30 AM GMT-0500 (EDT)',
 *   'MM/DD/YYYY h:mm:ss.SSS A [GMT]ZZ (z)')
 * //=> Tue Feb 11 2014 16:30:30 UTC
 */
function parseFromString (dateString, formatString) {
  const time = parseZonedTime(dateString, formatString)
  return convertTimeToDate(time)
}

export { parseFromString }
