'use strict'

const { assert } = require('chai')

const { getTextNode, getTag } = require('../../src/parser')
const NodeType = require('../../src/node-type')

let xmlStr

describe('parser.getTextNode(str)', () => {
  before(() => {
    xmlStr = '<payment>\n  <amount>10.00</amount>\n  <from>Evan</from>\n  <to>PayStand</to>\n</payment>'
  })

  it('should return object with a `type` property', () => {
    const tag = getTag(xmlStr, 61)
    const elementNode = getTextNode(tag)

    assert.strictEqual(elementNode.type, NodeType.text)
  })

  it('should return object with a `data` property', () => {
    const tag = getTag(xmlStr, 61)
    const elementNode = getTextNode(tag)

    assert.strictEqual(elementNode.data, 'PayStand')
  })
})
