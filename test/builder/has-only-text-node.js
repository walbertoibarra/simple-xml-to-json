'use strict'

const { assert } = require('chai')

const { hasOnlyTextNode } = require('../../lib/builder')
const { parseString } = require('../../lib/parser')

let xmlDoc

describe('builder.hasOnlyTextNode(xmlDoc)', () => {
  before(() => {
    const xmlStr = '<shipment>\n  <item>some item</item>\n  <from>Evan</from>\n  <to>PayStand</to>\n  <address>\n    <street>100 Enterprise Way</street>\n    <city>Scotts Valley</city>\n    <zip>95066</zip>\n  </address>\n</shipment>'

    xmlDoc = parseString(xmlStr)
  })

  it('should return false if it does not contain any text node', () => {
    const result = hasOnlyTextNode(xmlDoc)

    assert.isFalse(result)
  })

  it('should return false if it does not contain more than 1 nodes', () => {
    const result = hasOnlyTextNode(xmlDoc[0])

    assert.isFalse(result)
  })

  it('should return true if it contains only 1 node and it is a text node', () => {
    const result = hasOnlyTextNode(xmlDoc[0].childNodes[1].childNodes[0])

    assert.isFalse(result)
  })
})
