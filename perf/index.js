const { join } = require('path')
const { promisify } = require('util')
let { readdir } = require('fs')
let { exec } = require('child_process')

readdir = promisify(readdir)

const benchmarks = join(__dirname, '../perf')

async function listSuites () {
  const suites = await readdir(benchmarks)
  return suites.filter(suite => suite.lastIndexOf('.perf.js') > 0)
}

function runSuite (suite) {
  return new Promise((resolve, reject) => {
    const child = exec(`node "${suite}"`, {
      shell: true,
      cwd: benchmarks
    })
    child.stdout.on('data', data => process.stdout.write(data))
    child.stderr.on('data', data => process.stderr.write(data))
    child.on('close', code => {
      if (code) {
        reject() // eslint-disable-line prefer-promise-reject-errors
      } else {
        resolve()
      }
    })
  })
}

(async function () {
  try {
    const suites = await listSuites()
    for (let suite of suites) {
      await runSuite(suite)
      console.log()
    }
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
})()
