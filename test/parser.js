'use strict'

const { assert } = require('chai')

const parser = require('../src/parser')

let xmlStr

describe('Parser', () => {
  describe('#_getOpenTag()', () => {
    before(() => {
      xmlStr = '<payment><amount>10.00</amount></payment>'
    })

    it('should return object with a `start` property', () => {
      const openTag = parser._getOpenTag(xmlStr, 0)

      assert.strictEqual(openTag.start, 0)
    })

    it('should return object with an `end` property', () => {
      const openTag = parser._getOpenTag(xmlStr, 0)

      assert.strictEqual(openTag.end, 8)
    })

    it('should return object with a `tagName` property', () => {
      const openTag = parser._getOpenTag(xmlStr, 0)

      assert.strictEqual(openTag.tagName, 'payment')
    })

    it('should get the right tag according to given index', () => {
      const openTag = parser._getOpenTag(xmlStr, 1)

      assert.strictEqual(openTag.tagName, 'amount')
    })
  })

  describe('#_getCloseTag()', () => {
    before(() => {
      xmlStr = '<payment><amount>10.00</amount></payment>'
    })

    it('should return an object with a `start` property', () => {
      const openTag = parser._getOpenTag(xmlStr, 0)
      const closeTag = parser._getCloseTag(xmlStr, openTag)

      assert.strictEqual(closeTag.start, 31)
    })

    it('should return object with an `end` property', () => {
      const openTag = parser._getOpenTag(xmlStr, 0)
      const closeTag = parser._getCloseTag(xmlStr, openTag)

      assert.strictEqual(closeTag.end, 40)
    })

    it('should return object with a `tagName` property', () => {
      const openTag = parser._getOpenTag(xmlStr, 0)
      const closeTag = parser._getCloseTag(xmlStr, openTag)

      assert.strictEqual(closeTag.tagName, '/payment')
    })

    it('should get the right `closeTag` according to given `openTag`', () => {
      const openTag = parser._getOpenTag(xmlStr, 1)
      const closeTag = parser._getCloseTag(xmlStr, openTag)

      assert.strictEqual(closeTag.tagName, '/amount')
    })
  })

  describe('#_getTag()', () => {
    before(() => {
      xmlStr = '<payment><amount>10.00</amount></payment>'
    })

    it('should return object with a `openTag` property')
    it('should return object with a `closeTag` property')
    it('should return object with a `inner` property')
  })
})
