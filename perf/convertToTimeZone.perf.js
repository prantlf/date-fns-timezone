const moment = require('moment-timezone')
const { convertToTimeZone } = require('../dist/convertToTimeZone')
const createSuite = require('./createSuite')

const date = new Date('2018-09-01T16:01:36.386Z')
const timeZone = 'Europe/Berlin'

createSuite('convertToTimeZone')
  .add('Moment.js', () => moment(date).tz(timeZone))
  .add('date-fns', () => convertToTimeZone(date, { timeZone }))
  .start()
