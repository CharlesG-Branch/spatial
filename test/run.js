const glob = require('glob')
const tape = require('tape')
const common = require('./common')
const suite = process.argv[2] || ['unit', 'func']

// find all files ending in .test.js
const files = glob.sync('**/*.test.js', { realpath: true })

// unit and functional test predecates
const unit = (f) => !/\/test\//.test(f)
const func = (f) => /\/test\//.test(f)

// test runner
const run = (f) => require(f).all(tape, common)

// run unit tests
if (suite.includes('unit')) { files.filter(unit).forEach(run) }

// run functional tests
if (suite.includes('func')) { files.filter(func).forEach(run) }

// run environment tests
if (suite.includes('environment')) { require('./environment.js').all(tape, common) }
