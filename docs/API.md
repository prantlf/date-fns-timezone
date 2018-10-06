# API Reference

The API consists of functions only. They are divided to three modules, which you can load separately or together depending on your usage scenario.

### Table of Contents

- [Loading](#loading)
- [Modules](#modules)
  - [index-js](#index-js)
  - [index.umd.js](#index-umd-js)
- [Functions](#functions)
  - [convertToLocalTime](#converttolocaltime)
  - [convertToTimeZone](#converttotimezone)
  - [formatToTimeZone](#formattotimezone)
  - [parseFromString](#parsefromstring)
  - [parseFromTimeZone](#parsefromtimezone)

## Loading

Load the main module in an application using CommonJS modules:

```js
const {
  convertToLocalTime, convertToTimeZone, parseFromTimeZone, formatToTimeZone
 } = require('date-fns-timezone')
```

Load only specific modules in an application using CommonJS modules:

```js
const { convertToLocalTime } = require('date-fns-timezone/dist/convertToLocalTime')
const { convertToTimeZone } = require('date-fns-timezone/dist/convertToTimeZone')
const { parseFromTimeZone } = require('date-fns-timezone/dist/parseFromTimeZone')
const { formatToTimeZone } = require('date-fns-timezone/dist/formatToTimeZone')
```

Load the main module in an application using ES6 modules:

```js
import {
  convertToLocalTime, convertToTimeZone, parseFromTimeZone, formatToTimeZone
} from './node_modules/date-fns-timezone/src/index.js'
```

Load only specific modules in an application using ES6 modules:

```js
import { convertToLocalTime } from './node_modules/date-fns-timezone/src/convertToLocalTime.js'
import { convertToTimeZone } from './node_modules/date-fns-timezone/src/convertToTimeZone.js'
import { parseFromTimeZone } from './node_modules/date-fns-timezone/src/parseFromTimeZone.js'
import { formatToTimeZone } from './node_modules/date-fns-timezone/src/formatToTimeZone.js'
```

Load the main module in the browser with plain JavaScript:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.29.0/date_fns.min.js"></script>
<script src="./node_modules/timezone-support/dist/index.umd.js"></script>
<script src="./node_modules/date-fns-timezone/dist/index.umd.js"></script>
<script>
  (() => {
    const {
      convertToLocalTime, convertToTimeZone, parseFromTimeZone, formatToTimeZone
    } = window.dateFnsTimezone
  })()
</script>
```

Load the main module in the browser with [RequireJS]:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.29.0/date_fns.min.js"></script>
<script src="https://unpkg.com/timezone-support@1.5.1/dist/index.umd.js"></script>
<script src="https://unpkg.com/date-fns-timezone@0.1.2/dist/index.umd.js"></script>
<script>
  require(['date-fns-timezone'], ({ parseFromTimeZone, formatToTimeZone }) => {
  })
</script>
```

The last example shows also, how to load a specific version of the library from CDN.

## Modules

Modules in the `src` directory require ES6 including the new module syntax, as available in Node.js 8 and newer. Modules in the `dist` directory require ES5 and follow the CommonJS standard for older Node.js releases. Files `dist/*.umd.js` require ES5, are minified and follow the UMD standard to work well in web browsers.

Except for the `index` module including all functions, each function is exposed in a separate module with the same name as the function name and `.js` and `.umd.js` suffixes. You can load the separate modules, if you cannot use a bundler supporting tree-shaking for the size optimization.

### index.js

Main package module for Node.js application. CommonJS format. Includes all functions from the other modules.

### index.umd.js

Main package module first of all for web browsers. UMD format, minified. Includes all functions from the other modules. Make sure, that you include `script` elements for `date-fns` and `timezone-support` on your web page before this one [as documented earlier](#loading).

## Functions

Functions converting to an arbitrary time zone accept either a `Date` object, or a UNIX timestamp. (The UNIX timestamp is the time from the epoch in milliseconds, as returned by `date.prototype.getTime`.) They produce a complete [time object]. Functions converting from an arbitrary time zone accept a [time object] and return the UNIX timestamp.

### convertToLocalTime

```
convertToLocalTime(date: Date|string|number, options: object) : Date
```

Converts the given date from the given time zone to the local time and returns it as a new `Date` object. Getters for local time parts of the input `Date` object (`getFullYear`, `getMonth`, ...) will be assumed to return time in the given time zone.

* `argument` (Date|String|Number) - the value to convert
* `options` (Object) - the object with options
* `options.timeZone` (String) - the canonical name of the source time zone

The time zone has to be specified as a canonical name from the [IANA time zone list].

```js
const { convertToLocalTime } = require('date-fns-timezone')
// Convert the time in the New York time zone to the local time:
const date = new Date(2018, 8, 2, 10, 0)
const result = convertToLocalTime(date, { timeZone: 'America/New_York' })
// Returns { date: Date, zone: { abbreviation: 'EDT', offset: -360 }
// The date will be "2018-09-02T16:00:00Z".
```

### convertToTimeZone

```
convertToTimeZone(date: Date|number|string, options: object) : Date
```

Converts the given date from the local time to the given time zone and returns a new `Date` object, which has its local time set to it. The returned `Date` object should not be used form comparisons or other computations. Only the its getters for the local time parts can be used (`getFullYear`, `getMonth`, ...).

* `argument` (Date|String|Number) - the value to convert
* `options` (Object) - the object with options
* `options.timeZone` (String) - the canonical name of the target time zone

The time zone has to be specified as a canonical name from the [IANA time zone list].

```js
const { convertToTimeZone } = require('date-fns-timezone')
// Convert the current local time to the New York time zone:
var result = convertToTimeZone(new Date(), { timeZone: 'America/New_York' })
// Returns { date: Date, zone: { abbreviation: 'EST', offset: -300 }
```

### formatToTimeZone

```
formatToTimeZone(date: Date|string|number, format: string, options: object) : string
```

Returns the formatted date string in the given format, after converting it to the given time zone.

The input date will be converted to the given time zone by default, using its UTC timestamp. If the local time in the input date is already in the given time zone, set `options.convertTimeZone` to `false`. Otherwise the date will be considered in local time and converted.

* `argument` (Date|String|Number) - the original date
* `format` (String) - the string of formatting tokens
* `options` (Object) - the object with options
* `options.locale` (Object) - the locale object; optional, defaults to English
* `options.timeZone` (String) - the canonical name of the target time zone
* `options.convertTimeZone` (String) - if the date should be converted to the given time zone before formatting; optional, defaults to `true`

The locale can be loaded and applied in the same way, as it works for the function [`format` from date-fns](https://date-fns.org/v1.29.0/docs/format).

The time zone has to be specified as a canonical name from the [IANA time zone list].

The following tokens are recognized in the format string:

| Unit                    | Token | Result examples                  |
|-------------------------|-------|----------------------------------|
| Month                   | M     | 1, 2, ..., 12                    |
|                         | Mo    | 1st, 2nd, ..., 12th              |
|                         | MM    | 01, 02, ..., 12                  |
|                         | MMM   | Jan, Feb, ..., Dec               |
|                         | MMMM  | January, February, ..., December |
| Quarter                 | Q     | 1, 2, 3, 4                       |
|                         | Qo    | 1st, 2nd, 3rd, 4th               |
| Day of month            | D     | 1, 2, ..., 31                    |
|                         | Do    | 1st, 2nd, ..., 31st              |
|                         | DD    | 01, 02, ..., 31                  |
| Day of year             | DDD   | 1, 2, ..., 366                   |
|                         | DDDo  | 1st, 2nd, ..., 366th             |
|                         | DDDD  | 001, 002, ..., 366               |
| Day of week             | d     | 0, 1, ..., 6                     |
|                         | do    | 0th, 1st, ..., 6th               |
|                         | dd    | Su, Mo, ..., Sa                  |
|                         | ddd   | Sun, Mon, ..., Sat               |
|                         | dddd  | Sunday, Monday, ..., Saturday    |
| Day of ISO week         | E     | 1, 2, ..., 7                     |
| ISO week                | W     | 1, 2, ..., 53                    |
|                         | Wo    | 1st, 2nd, ..., 53rd              |
|                         | WW    | 01, 02, ..., 53                  |
| Year                    | YY    | 00, 01, ..., 99                  |
|                         | YYYY  | 1900, 1901, ..., 2099            |
| ISO week-numbering year | GG    | 00, 01, ..., 99                  |
|                         | GGGG  | 1900, 1901, ..., 2099            |
| AM/PM                   | A     | AM, PM                           |
|                         | a     | am, pm                           |
|                         | aa    | a.m., p.m.                       |
| Hour                    | H     | 0, 1, ... 23                     |
|                         | HH    | 00, 01, ... 23                   |
|                         | h     | 1, 2, ..., 12                    |
|                         | hh    | 01, 02, ..., 12                  |
| Minute                  | m     | 0, 1, ..., 59                    |
|                         | mm    | 00, 01, ..., 59                  |
| Second                  | s     | 0, 1, ..., 59                    |
|                         | ss    | 00, 01, ..., 59                  |
| 1/10 of second          | S     | 0, 1, ..., 9                     |
| 1/100 of second         | SS    | 00, 01, ..., 99                  |
| Millisecond             | SSS   | 000, 001, ..., 999               |
| Timezone abbreviation   | z     | CET, CEST, EST, EDT, ...         |
| Timezone offset to UTC  | Z     | -01:00, +00:00, ... +12:00       |
|                         | ZZ    | -0100, +0000, ..., +1200         |
| Seconds timestamp       | X     | 512969520                        |
| Milliseconds timestamp  | x     | 512969520900                     |

To escape characters in the format string, wrap them in square brackets (e.g. `[GMT]`). Punctuation symbols (-:/.()) do not need to be wrapped.

```js
const { formatToTimeZone } = require('date-fns-timezone')
// Represent midnight on 11 February 2014, UTC in middle-endian format, New York time:
const result = formatToTimeZone(
  new Date(Date.UTC(2014, 1, 11)), 'MM/dd/yyyy h:mm A [GMT]Z (z)',
  { timeZone: 'America/New_York' }
)
// Returns '02/10/2014 7:00 PM GMT-0500 (EST)'
```

```js
// Represent noon on 2 July 2014 in Esperanto, Madrid time:
const { formatToTimeZone } = require('date-fns-timezone')
const locale = require('date-fns/locale/eo')
const result = formatToTimeZone(
  new Date(2014, 6, 2, 12), "HH:mm, do 'de' MMMM yyyy (Zz)",
  { locale, timeZone: 'Europe/Madrid', convertTimeZone: false }
)
// Returns '12:00, 2-a de julio 2014 (+02:00 CEST)'
```

### parseFromString

```
parseFromString(input: string, format: string) : Date
```

Returns the date parsed from the date string using the given format string and converts the parsed date to the local time.

* `input` (String) - the string to parse
* `format` (String) - the custom format to parse the date from

The following tokens are recognized in the format string:

| Token  | Input example    | Description                       |
|--------|------------------|-----------------------------------|
| `YY`   | 18               | Two-digit year                    |
| `YYYY` | 2018             | Four-digit year                   |
| `M`    | 1-12             | Month, beginning at 1             |
| `MM`   | 01-12            | Month, 2-digits                   |
| `D`    | 1-31             | Day of month                      |
| `DD`   | 01-31            | Day of month, 2-digits            |
| `H`    | 0-23             | Hours                             |
| `HH`   | 00-23            | Hours, 2-digits                   |
| `h`    | 1-12             | Hours, 12-hour clock              |
| `hh`   | 01-12            | Hours, 12-hour clock, 2-digits    |
| `m`    | 0-59             | Minutes                           |
| `mm`   | 00-59            | Minutes, 2-digits                 |
| `s`    | 0-59             | Seconds                           |
| `ss`   | 00-59            | Seconds, 2-digits                 |
| `S`    | 0-9              | Hundreds of milliseconds, 1-digit |
| `SS`   | 00-99            | Tens of milliseconds, 2-digits    |
| `SSS`  | 000-999          | Milliseconds, 3-digits            |
| `z`    | EST              | Time zone abbreviation            |
| `Z`    | -5:00            | Offset from UTC, 2-digits         |
| `ZZ`   | -0500            | Compact offset from UTC, 2-digits |
| `A`    | AM PM            | Post or ante meridiem, upper-case |
| `a`    | am pm            | Post or ante meridiem, lower-case |

To escape characters in the format string, wrap them in square brackets (e.g. `[G]`). Punctuation symbols (-:/.()) do not need to be wrapped.

```js
// Parse string '11.2.2014 11:30:30' to date in Berlin:
const result = parseFromTimeZone(
  '11.2.2014 11:30:30', 'D.M.YYYY H:mm:ss')
// Returns Tue Feb 11 2014 10:30:30 UTC
```

```js
// Parse string '02/11/2014 11:30:30' to date, New York time:
const result = parseFromString(
  '02/11/2014 11:30:30 AM GMT-0500 (EDT)',
  'MM/DD/YYYY h:mm:ss.SSS A [GMT]ZZ (z)')
// Returns Tue Feb 11 2014 16:30:30 UTC
```

### parseFromTimeZone

```
parseFromTimeZone(input: string, format?: string, options: object) : Date
```

Returns the date parsed from the date string, optionally using the given format string, and converts the parsed date from the given time zone to the local time.

* `input` (String) - the string to parse
* `format` (String) - the custom format to parse the date from; optional
* `options` (Object) - the object with options
* `options.timeZone` (String) - the canonical name of the source time zone

If the format string is omitted, the date string will be parsed by [`date-fns/parse`](https://date-fns.org/v1.29.0/docs/parse), which supports extended ISO 8601 formats.

The time zone has to be specified as a canonical name from the [IANA time zone list].

The following tokens are recognized in the format string:

| Token  | Input example    | Description                       |
|--------|------------------|-----------------------------------|
| `YY`   | 18               | Two-digit year                    |
| `YYYY` | 2018             | Four-digit year                   |
| `M`    | 1-12             | Month, beginning at 1             |
| `MM`   | 01-12            | Month, 2-digits                   |
| `D`    | 1-31             | Day of month                      |
| `DD`   | 01-31            | Day of month, 2-digits            |
| `H`    | 0-23             | Hours                             |
| `HH`   | 00-23            | Hours, 2-digits                   |
| `h`    | 1-12             | Hours, 12-hour clock              |
| `hh`   | 01-12            | Hours, 12-hour clock, 2-digits    |
| `m`    | 0-59             | Minutes                           |
| `mm`   | 00-59            | Minutes, 2-digits                 |
| `s`    | 0-59             | Seconds                           |
| `ss`   | 00-59            | Seconds, 2-digits                 |
| `S`    | 0-9              | Hundreds of milliseconds, 1-digit |
| `SS`   | 00-99            | Tens of milliseconds, 2-digits    |
| `SSS`  | 000-999          | Milliseconds, 3-digits            |
| `z`    | EST              | Time zone abbreviation            |
| `Z`    | -5:00            | Offset from UTC, 2-digits         |
| `ZZ`   | -0500            | Compact offset from UTC, 2-digits |
| `A`    | AM PM            | Post or ante meridiem, upper-case |
| `a`    | am pm            | Post or ante meridiem, lower-case |

To escape characters in the format string, wrap them in square brackets (e.g. `[G]`). Punctuation symbols (-:/.()) do not need to be wrapped.

```js
// Parse string '2014-02-11 11:30:30 AM' to date, New York time:
const result = parseFromTimeZone(
  '2014-02-11 11:30:30', { timeZone: 'America/New_York' })
// Returns Tue Feb 11 2014 16:30:30 UTC
```

```js
// Parse string '11.2.2014 11:30:30' to date, Berlin time:
const result = parseFromTimeZone(
  '11.2.2014 11:30:30', 'D.M.YYYY H:mm:ss',
   { timeZone: 'Europe/Berlin' })
// Returns Tue Feb 11 2014 10:30:30 UTC
```

[time object]: ./design.md#time-object
[IANA time zone list]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
