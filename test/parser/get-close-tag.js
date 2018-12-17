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

  it('should get the right `closeTag` even if there are other tags with the same name on siblin or child elements', () => {
    const xmlStr = '<nutrition><daily-values><total-fat>65</total-fat><saturated-fat>20</saturated-fat><cholesterol>300</cholesterol><sodium>2400</sodium><carb>300</carb><fiber>25</fiber><protein>50</protein></daily-values><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving>29</serving><total-fat>11</total-fat><saturated-fat>3</saturated-fat><cholesterol>5</cholesterol><sodium>210</sodium><carb>2</carb><fiber>0</fiber><protein>1</protein><vitamins><a>0</a><c>0</c></vitamins><minerals><ca>0</ca><fe>0</fe></minerals></food></nutrition>'
    const openTag = getOpenTag(xmlStr, 83)
    const closeTag = getCloseTag(xmlStr, openTag)

    assert.strictEqual(closeTag.tagName, '/cholesterol')
    assert.strictEqual(closeTag.start, 99)
  })
})
