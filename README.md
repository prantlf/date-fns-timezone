# date-fns-timezone
[![NPM version](https://badge.fury.io/js/date-fns-timezone.png)](http://badge.fury.io/js/date-fns-timezone)
[![Build Status](https://travis-ci.org/prantlf/date-fns-timezone.png)](https://travis-ci.org/prantlf/date-fns-timezone)
[![Coverage Status](https://coveralls.io/repos/github/prantlf/date-fns-timezone/badge.svg?branch=master)](https://coveralls.io/github/prantlf/date-fns-timezone?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4bb0f2ef6c1b4212a4ed2dbf1f3e8b29)](https://www.codacy.com/app/prantlf/date-fns-timezone?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prantlf/date-fns-timezone&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://david-dm.org/prantlf/date-fns-timezone.svg)](https://david-dm.org/prantlf/date-fns-timezone)
[![devDependency Status](https://david-dm.org/prantlf/date-fns-timezone/dev-status.svg)](https://david-dm.org/prantlf/date-fns-timezone#info=devDependencies)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Provides parsing and formatting date strings and time zone conversions supporting [IANA time zones], following the design of functions in [date-fns]. List of canonical time zone names is provided by [timezone-support].

- [Synopsis](#synopsis)
- [Installation and Loading](#installation-and-loading)
  - [Specific Environments](#specific-environments)
- [Usage Scenarios](#usage-scenarios)
  - [List all available time zones](#list-all-available-time-zones)
  - [Parse a date from a string in a specific time zone](#parse-a-date-from-a-string-in-a-specific-time-zone)
  - [Format a date to a string in specific time zone](#format-a-date-to-a-string-in-specific-time-zone)
  - [Change the time zone of date](#change-the-time-zone-of-date)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

## Synopsis

```js
const { listTimeZones } = require('timezone-support')
const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')

// List canonical time zone names: [ 'Africa/Abidjan', ... ]
const timeZones = listTimeZones()

// Set the date to "2018-09-01T16:01:36.386Z"
const date = parseFromTimeZone('2018-09-01 18:01:36.386', { timeZone: 'Europe/Berlin' })

// Set the output to "1.9.2018 18:01:36.386 GMT+02:00 (CEST)"
const date = new Date('2018-09-01Z16:01:36.386Z')
const format = 'D.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'
const output = formatToTimeZone(date, format, { timeZone: 'Europe/Berlin' })
```

## Installation and Loading

This module can be installed in your project using [NPM] or [Yarn]. Make sure, that you use [Node.js] version 6 or newer.

```sh
$ npm i date-fns-timezone --save
```

```sh
$ yarn add date-fns-timezone
```

### Specific Environments

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
<script src="https://unpkg.com/timezone-support@1.3.1/dist/index.umd.js"></script>
<script src="https://unpkg.com/date-fns-timezone@0.1.0/dist/index.umd.js"></script>
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
<script src="https://unpkg.com/timezone-support@1.3.1/dist/index.umd.js"></script>
<script src="https://unpkg.com/date-fns-timezone@0.1.0/dist/index.umd.js"></script>
<script>
  require(['date-fns-timezone'], ({ parseFromTimeZone, formatToTimeZone }) => {
  })
</script>
```

## Usage Scenarios

The minimal, but powerful API of this module provides functionality for the most usual usage scenarios in your web  applications.

### List all available time zones

Users may need to choose the time zone, which they want to see and enter dates in. Time zones can be listed in a dropdown for the user to choose from, for example.

```js
const { listTimeZones } = require('timezone-support')
const timeZones = listTimeZones()
```

See the function [listTimeZones] for more information.

### Parse a date from a string in a specific time zone

Dates are usually entered in a time zone chosen by the user, but they are supposed to be stored in UTC. After the user input is parsed, the result date needs to be converted from the user time zone to the native `Date` object, which maintains the date in the browser-local time zone and UTC.

```js
const { parseZonedTime } = require('date-fns-timezone/dist/parseFromTimeZone')

const enteredTime = '2018-09-02 12:04:30.982'
const timeZone = 'Europe/Berlin'
const storedDate = parseFromTimeZone(enteredTime, { timeZone })
// Contains date "2018-09-02T10:04:30.982Z"

const enteredTime = '09/02/2018 12:04:30.982 PM'
const customFormat = 'MM/DD/YYYY h:mm:ss.SSS A'
const timeZone = 'America/New_York'
const storedDate = parseFromTimeZone(enteredTime, customFormat, { timeZone })
// Contains date "2018-09-02T18:04:30.982Z"
```

See the function [parseFromTimeZone](#parsefromtimezone) for more information.

### Format a date to a string in specific time zone

Dates are supposed to be stored in UTC, but they are usually displayed in a time zone chosen by the user. Before the date value is formatted, it needs to be converted to the user time zone.

```js
const { formatToTimeZone } = require('date-fns-timezone/dist/formatToTimeZone')

const storedDate = new Date('2018-09-02T10:04:30.982Z')
const format = 'D.M.YYYY H:mm:ss [GMT]Z (z)'
const timeZone = 'Europe/Berlin'
const displayedTime = formatToTimeZone(storedDate, format, { timeZone })
// Contains string "2.9.2018 12:04:30 GMT+02:00 (CEST)"
```

See the function [formatToTimeZone](#formattotimezone) for more information.

### Change the time zone of date

Date pickers usually supply the date, which the user selected, and the time zone is implied from the user settings. The local time in the date value is not the browser-local time and the UTC value cannot be used. The date has to be converted from the user time zone to the browser-local time to become valid.

```js
const { convertToLocalTime } = require('date-fns-timezone/dist/convertToLocalTime')

const chosenDate = new Date(2018, 8, 2, 12, 4, 30, 982)
const timeZone = 'Europe/Berlin'
const storedDate = convertToLocalTime(chosenDate, { timeZone })
// Contains date "2018-09-02T10:04:30.982Z"
```

Date pickers are usually initialized by a date in the time zone implied from the user settings. However, the browser-local time may be different. The date has to be converted from the browser-local time to the user time zone before passed to the picker. Such date can be formatted only by using its getters (getFullYear, getMonth, ...); it is invalid for computations and comparisons, because it cannot be related to UTC.

```js
const { convertToTimeZone } = require('date-fns-timezone/dist/convertToTimeZone')

const storedDate = new Date('2018-09-02T10:04:30.982Z')
const timeZone = 'Europe/Berlin'
const defaultDate = convertToTimeZone(storedDate, { timeZone })
// Contains date "2018-09-02 12:04:30.982"
```

See functions [convertToLocalTime](#converttolocaltime) and [convertToTimeZone](#converttotimezone) for more information.

## API Reference

The API consists of functions only. They are divided to three modules, which you can load separately or together depending on your usage scenario.

### date-fns-timezone/dist/index

Main package module for Node.js application. CommonJS format. Includes all functions from the other modules.

### date-fns-timezone/dist/index.umd.js

Main package module first of all for web browsers. UMD format, minified. Includes all functions from the other modules. Make sure, that you include `script` elements for `date-fns` and `timezone-support` on your web page before this one [as documented earlier](#specific-environments).

### convertToLocalTime
### convertToTimeZone
### parseFromTimeZone
### formatToTimeZone

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release History

* 2018-09-19   v0.1.0   Add parseString without a time zone to cover a gap in date-fns
* 2018-09-17   v0.0.1   Initial release

## License

Copyright (c) 2018 Ferdinand Prantl

Licensed under the MIT license.

[IANA time zones]: https://www.iana.org/time-zones
[date-fns]: https://github.com/date-fns/date-fns
[timezone-support]: https://github.com/prantlf/timezone-support
[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/
[RequireJS]: https://requirejs.org/
[listTimeZones]: https://github.com/prantlf/timezone-support#listtimezones
