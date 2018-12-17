'use strict'

const builder = require('./builder')
const parser = require('./parser')

const parseString = (str) => {
  const xmlObj = parser.parseString(str)
  const parsedJs = builder.buildObject(xmlObj)

  return JSON.stringify(parsedJs)
}

module.exports = {
  parseString
}
