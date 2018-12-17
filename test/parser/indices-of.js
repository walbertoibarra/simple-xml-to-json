'use strict'

const { assert } = require('chai')

const { indicesOf } = require('../../src/parser')

const xmlStr = '<nutrition><daily-values><total-fat>65</total-fat><saturated-fat>20</saturated-fat><cholesterol>300</cholesterol><sodium>2400</sodium><carb>300</carb><fiber>25</fiber><protein>50</protein></daily-values><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving>29</serving><total-fat>11</total-fat><saturated-fat>3</saturated-fat><cholesterol>5</cholesterol><sodium>210</sodium><carb>2</carb><fiber>0</fiber><protein>1</protein><vitamins><a>0</a><c>0</c></vitamins><minerals><ca>0</ca><fe>0</fe></minerals></food></nutrition>'

describe('parser.indicesOf(str, searchValue)', () => {
  it('returns an array', () => {
    const indices = indicesOf(xmlStr, '<cholesterol>')

    assert.isArray(indices)
  })

  it('returns all indices of given `searchValue`', () => {
    const indices = indicesOf(xmlStr, '<cholesterol>')

    assert.sameOrderedMembers(indices, [83, 331])
  })

  it('returns an empty array if `searchValue` was not found', () => {
    const indices = indicesOf(xmlStr, '<tag-not-found>')

    assert.lengthOf(indices, 0)
  })
})
