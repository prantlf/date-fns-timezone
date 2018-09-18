const moment = require('moment-timezone')
const { formatToTimeZone } = require('../dist/formatToTimeZone')
const createSuite = require('./createSuite')

const date = new Date('2018-09-01T16:01:36.386Z')
const format = 'D.M.Y H:MM:ss.SSS [GMT]Z (z)'
const timeZone = 'Europe/Berlin'

createSuite('formatToTimeZone')
  .add('Moment.js', () => moment(date).tz(timeZone).format(format))
  .add('date-fns', () => formatToTimeZone(date, format, { timeZone }))
  .start()
