'use strict'

const { assert } = require('chai')

const { getTag } = require('../../src/parser')

let xmlStr

describe('parser.getTag(str, index)', () => {
  before(() => {
    xmlStr = '<payment>\n  <amount>10.00</amount>\n  <from>Evan</from>\n  <to>PayStand</to>\n</payment>'
  })

  it('should return a string if no tag was found', () => {
    const tag = getTag('Some text', 0)

    assert.strictEqual(tag, 'Some text')
  })

  it('should return a string if tag was found after the given `index`', () => {
    const tag = getTag(xmlStr, 9)

    assert.strictEqual(tag, '\n  ')
  })

  it('should return object with a `openTag` property', () => {
    const tag = getTag(xmlStr, 0)

    assert.deepEqual(tag.openTag, { start: 0, end: 8, tagName: 'payment' })
  })

  it('should return object with a `closeTag` property', () => {
    const tag = getTag(xmlStr, 0)

    assert.deepEqual(tag.closeTag, { start: 75, end: 84, tagName: '/payment' })
  })

  it('should return object with a `innerXml` property', () => {
    const tag = getTag(xmlStr, 0)

    assert.strictEqual(tag.innerXml, '\n  <amount>10.00</amount>\n  <from>Evan</from>\n  <to>PayStand</to>\n')
  })

  it('should return the right `tag` according to given `index`', () => {
    const tag = getTag(xmlStr, 12)

    assert.strictEqual(tag.openTag.tagName, 'amount')
    assert.strictEqual(tag.closeTag.tagName, '/amount')
    assert.strictEqual(tag.innerXml, '10.00')
  })
})
