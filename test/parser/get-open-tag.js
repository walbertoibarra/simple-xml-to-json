'use strict'

const { assert } = require('chai')

const { getOpenTag } = require('../../lib/parser')

let xmlStr

describe('parser.getOpenTag(str, index)', () => {
  before(() => {
    xmlStr = '<payment>\n  <amount>10.00</amount>\n  <from>Evan</from>\n  <to>PayStand</to>\n</payment>'
  })

  it('should return object with a `start` property', () => {
    const openTag = getOpenTag(xmlStr, 0)

    assert.strictEqual(openTag.start, 0)
  })

  it('should return object with an `end` property', () => {
    const openTag = getOpenTag(xmlStr, 0)

    assert.strictEqual(openTag.end, 8)
  })

  it('should return object with a `tagName` property', () => {
    const openTag = getOpenTag(xmlStr, 0)

    assert.strictEqual(openTag.tagName, 'payment')
  })

  it('should get the right `openTag` according to given `index`', () => {
    const openTag = getOpenTag(xmlStr, 9)

    assert.deepEqual(openTag, { start: 12, end: 19, tagName: 'amount' })
  })

  it('should return -1 on the `start` property when no tag is found', () => {
    const openTag = getOpenTag('Some text', 0)

    assert.strictEqual(openTag.start, -1)
  })
})
