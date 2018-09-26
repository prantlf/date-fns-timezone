# Usage Scenarios

The minimal, but powerful API of this module provides functionality for the most usual usage scenarios in your web  applications.

### Table of Contents

- [List all available time zones](#list-all-available-time-zones)
- [Parse a date from a string in a specific time zone](#parse-a-date-from-a-string-in-a-specific-time-zone)
- [Format a date to a string in specific time zone](#format-a-date-to-a-string-in-specific-time-zone)
- [Change the time zone of date](#change-the-time-zone-of-date)

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

See the function [parseFromTimeZone](./API.md#parsefromtimezone) for more information.

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

See the function [formatToTimeZone](./API.md#formattotimezone) for more information.

### Change the time zone of date

Date pickers usually supply the date, which the user selected, and the time zone is implied from the user settings. The local time in the date value is not the browser-local time and the UTC value cannot be used. The date has to be converted from the user time zone to the browser-local time to become valid.

```js
const { convertToLocalTime } = require('date-fns-timezone/dist/convertToLocalTime')

const chosenDate = new Date(2018, 8, 2, 12, 4, 30, 982)
const timeZone = 'Europe/Berlin'
const storedDate = convertToLocalTime(chosenDate, { timeZone })
// Contains date "2018-09-02T10:04:30.982Z"
```

Date pickers are usually initialized by a date in the time zone implied from the user settings. However, the browser-local time may be different. The date has to be converted from the browser-local time to the user time zone before passed to the picker. Such date can be formatted only by using its getters (`getFullYear`, `getMonth`, ...); it is invalid for computations and comparisons, because it cannot be related to UTC.

```js
const { convertToTimeZone } = require('date-fns-timezone/dist/convertToTimeZone')

const storedDate = new Date('2018-09-02T10:04:30.982Z')
const timeZone = 'Europe/Berlin'
const defaultDate = convertToTimeZone(storedDate, { timeZone })
// Contains date "2018-09-02 12:04:30.982"
```

See functions [convertToLocalTime](./API.md#converttolocaltime) and [convertToTimeZone](./API.md#converttotimezone) for more information.

[listTimeZones]: https://github.com/prantlf/timezone-support/blob/master/docs/API.md#listtimezones
