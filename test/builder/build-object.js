'use strict'

const { assert } = require('chai')

const { buildObject } = require('../../lib/builder')
const { parseString } = require('../../lib/parser')

let xmlDoc

describe('builder.buildObject(xmlDoc)', () => {
  before(() => {
    const xmlStr = '<shipment>\n  <item>\n  some item\n</item>\n  <from>Evan</from>\n  <to>PayStand</to>\n  <address>\n    <street>100 Enterprise Way</street>\n    <city>Scotts Valley</city>\n    <zip>95066</zip>\n  </address>\n</shipment>'

    xmlDoc = parseString(xmlStr)
  })

  it('should return an object', () => {
    const result = buildObject(xmlDoc)

    assert.isObject(result)
  })

  it('should return an object with 1 key at first level', () => {
    const result = buildObject(xmlDoc)

    assert.hasAllKeys(result, ['shipment'])
  })

  it('should return an object with 4 keys at second level', () => {
    const result = buildObject(xmlDoc)

    assert.hasAllKeys(result.shipment, ['item', 'from', 'to', 'address'])
  })

  it('should return an object with 3 keys at third level', () => {
    const result = buildObject(xmlDoc)

    assert.hasAllKeys(result.shipment.address, ['street', 'city', 'zip'])
  })

  it('should trim all element values', () => {
    const result = buildObject(xmlDoc)

    assert.strictEqual(result.shipment.item, 'some item')
  })

  it('should throw if element values contain invalid characters', () => {
    assert.throws(() => {
      const xmlDoc = parseString('<test>Hel>lo</test>')

      buildObject(xmlDoc)
    }, 'Invalid character ">" found')

    assert.throws(() => {
      const xmlDoc = parseString('<test>Hel/lo</test>')

      buildObject(xmlDoc)
    }, 'Invalid character "/" found')
  })

  it('should return a valid JSON object', () => {
    const result = buildObject(xmlDoc)
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
