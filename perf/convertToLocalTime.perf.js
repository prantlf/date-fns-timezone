const moment = require('moment-timezone')
const { convertToLocalTime } = require('../dist/convertToLocalTime')
const createSuite = require('./createSuite')

const date = new Date('2018-09-01T16:01:36.386Z')
const timeZone = 'Europe/Berlin'

createSuite('convertToLocalTime')
  .add('Moment.js', () => moment.tz(date, timeZone))
  .add('date-fns', () => convertToLocalTime(date, { timeZone }))
  .start()
