const moment = require('moment-timezone')
const { parseFromTimeZone } = require('../dist/parseFromTimeZone')
const createSuite = require('./createSuite')

const input = '2018-09-01 18:01:36.386'
const timeZone = 'Europe/Berlin'

createSuite('parseFromTimeZone')
  .add('Moment.js', () => moment.tz(input, timeZone))
  .add('date-fns', () => parseFromTimeZone(input, { timeZone }))
  .start()
