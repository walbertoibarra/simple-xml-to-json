'use strict'

const { assert } = require('chai')

const { getCloseTag, getOpenTag } = require('../../src/parser')

let xmlStr

describe('parser.getCloseTag(str, openTag)', () => {
  before(() => {
    xmlStr = '<payment>\n  <amount>10.00</amount>\n  <from>Evan</from>\n  <to>PayStand</to>\n</payment>'
  })

  it('should return an object with a `start` property', () => {
    const openTag = getOpenTag(xmlStr, 0)
    const closeTag = getCloseTag(xmlStr, openTag)

    assert.strictEqual(closeTag.start, 75)
  })

  it('should return object with an `end` property', () => {
    const openTag = getOpenTag(xmlStr, 0)
    const closeTag = getCloseTag(xmlStr, openTag)

    assert.strictEqual(closeTag.end, 84)
  })

  it('should return object with a `tagName` property', () => {
    const openTag = getOpenTag(xmlStr, 0)
    const closeTag = getCloseTag(xmlStr, openTag)

    assert.strictEqual(closeTag.tagName, '/payment')
  })

  it('should get the right `closeTag` according to given `openTag`', () => {
    const openTag = getOpenTag(xmlStr, 9)
    const closeTag = getCloseTag(xmlStr, openTag)

    assert.strictEqual(closeTag.tagName, '/amount')
  })
})
