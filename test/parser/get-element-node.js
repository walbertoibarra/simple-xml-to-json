'use strict'

const { assert } = require('chai')

const { getElementNode, getTag } = require('../../lib/parser')
const NodeType = require('../../lib/node-type')

let xmlStr

describe('parser.getElementNode(tag)', () => {
  before(() => {
    xmlStr = '<payment>\n  <amount>10.00</amount>\n  <from>Evan</from>\n  <to>PayStand</to>\n</payment>'
  })

  it('should return object with a `type` property', () => {
    const tag = getTag(xmlStr, 0)
    const elementNode = getElementNode(tag, 0)

    assert.strictEqual(elementNode.type, NodeType.element)
  })

  it('should return object with a `tagName` property', () => {
    const tag = getTag(xmlStr, 0)
    const elementNode = getElementNode(tag, 0)

    assert.strictEqual(elementNode.tagName, 'payment')
  })

  it('should return object with a `childNodes` property', () => {
    const tag = getTag(xmlStr, 0)
    const elementNode = getElementNode(tag, 0)

    assert.isArray(elementNode.childNodes)
    assert.lengthOf(elementNode.childNodes, 7) // 3 element nodes and 4 text nodes (new lines and spaces).
    assert.strictEqual(elementNode.childNodes[0].type, NodeType.text)
    assert.strictEqual(elementNode.childNodes[0].data, '\n  ')
    assert.strictEqual(elementNode.childNodes[1].type, NodeType.element)
    assert.strictEqual(elementNode.childNodes[1].tagName, 'amount')
  })
})
