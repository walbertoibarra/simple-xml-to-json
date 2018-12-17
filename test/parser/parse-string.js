'use strict'

const _ = require('lodash')
const { assert } = require('chai')

const NodeType = require('../../src/node-type')
const { parseString } = require('../../src/parser')

let xmlStr
let nestedXmlStr

describe('parser.parseString(str)', () => {
  before(() => {
    xmlStr = '<payment>\n  <amount>10.00</amount>\n  <from>Evan</from>\n  <to>PayStand</to>\n</payment>'
    nestedXmlStr = '<shipment>\n  <item>some item</item>\n  <from>Evan</from>\n  <to>PayStand</to>\n  <address>\n    <street>100 Enterprise Way</street>\n    <city>Scotts Valley</city>\n    <zip>95066</zip>\n  </address>\n</shipment>'
  })

  it('should return an array of length 1', () => {
    const xmlObj = parseString(xmlStr)

    assert.isArray(xmlObj)
    assert.lengthOf(xmlObj, 1)
  })

  it('should contain one element node at the first level', () => {
    const xmlObj = parseString(xmlStr)

    assert.strictEqual(xmlObj[0].type, NodeType.element)
    assert.strictEqual(xmlObj[0].tagName, 'payment')
  })

  it('should contain three element nodes and three text nodes (new lines and spaces) at the second level', () => {
    const xmlObj = parseString(xmlStr)
    const count = _.countBy(xmlObj[0].childNodes, 'type')

    assert.lengthOf(xmlObj[0].childNodes, 7)
    assert.strictEqual(count[NodeType.properties.element.id], 3)
    assert.strictEqual(count[NodeType.properties.text.id], 3)
  })

  it('should contain one text node at the third level', () => {
    const xmlObj = parseString(xmlStr)

    assert.strictEqual(xmlObj[0].childNodes[1].type, NodeType.element)
    assert.lengthOf(xmlObj[0].childNodes[1].childNodes, 1)
    assert.strictEqual(xmlObj[0].childNodes[1].childNodes[0].type, NodeType.text)
    assert.strictEqual(xmlObj[0].childNodes[1].childNodes[0].data, '10.00')
  })

  it('should parse elements at any level', () => {
    const xmlObj = parseString(nestedXmlStr)

    assert.strictEqual(xmlObj[0].childNodes[1].type, NodeType.element)
    assert.lengthOf(xmlObj[0].childNodes, 9)
    assert.lengthOf(xmlObj[0].childNodes[7].childNodes, 7)
    assert.strictEqual(xmlObj[0].childNodes[7].childNodes[3].childNodes[0].data, 'Scotts Valley')
  })
})
