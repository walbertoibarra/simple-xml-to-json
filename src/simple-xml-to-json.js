'use strict'

const builder = require('./builder')
const parser = require('./parser')

const parseString = (str) => {
  const xmlObj = parser.parseString(str)

  return builder.buildJson(xmlObj)
}

module.exports = {
  parseString
}
