'use strict'

const builder = require('./builder')
const parser = require('./parser')

const parseString = (str) => {
  const xmlObj = parser.parseString(str)
  const parsedJs = builder.buildObject(xmlObj)

  if (typeof parsedJs === 'string') {
    throw new Error('Content is not allowed in prolog')
  }

  if (Object.keys(parsedJs).length > 1) {
    throw new Error('Extra content at the end of the document')
  }

  return JSON.stringify(parsedJs)
}

module.exports = {
  parseString
}
