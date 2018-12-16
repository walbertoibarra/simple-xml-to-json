'use strict'

const { assert } = require('chai')

const { buildJson } = require('../../src/builder')
const { parseString } = require('../../src/parser')

let xmlDoc

describe('builder.buildJson(xmlDoc)', () => {
  before(() => {
    const xmlStr = '<shipment>\n  <item>some item</item>\n  <from>Evan</from>\n  <to>PayStand</to>\n  <address>\n    <street>100 Enterprise Way</street>\n    <city>Scotts Valley</city>\n    <zip>95066</zip>\n  </address>\n</shipment>'

    xmlDoc = parseString(xmlStr)
  })

  it('should return an object', () => {
    const result = buildJson(xmlDoc)

    assert.isObject(result)
  })

  it('should return an object with 1 key at first level', () => {
    const result = buildJson(xmlDoc)

    assert.hasAllKeys(result, ['shipment'])
  })

  it('should return an object with 4 keys at second level', () => {
    const result = buildJson(xmlDoc)

    assert.hasAllKeys(result.shipment, ['item', 'from', 'to', 'address'])
  })

  it('should return an object with 3 keys at third level', () => {
    const result = buildJson(xmlDoc)

    assert.hasAllKeys(result.shipment.address, ['street', 'city', 'zip'])
  })

  it('should return a valid JSON object', () => {
    const result = buildJson(xmlDoc)
    const expectedJson = {
      shipment: {
        item: 'some item',
        from: 'Evan',
        to: 'PayStand',
        address: {
          street: '100 Enterprise Way',
          city: 'Scotts Valley',
          zip: '95066'
        }
      }
    }

    assert.deepEqual(result, expectedJson)
  })
})
