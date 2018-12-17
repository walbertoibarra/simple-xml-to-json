'use strict'

const { assert } = require('chai')

const { parseString } = require('../../src/simple-xml-to-json')

let xmlStr

describe('simpleXmlToJson.parseString(str)', () => {
  before(() => {
    xmlStr = '<nutrition><daily-values><total-fat>65</total-fat><saturated-fat>20</saturated-fat><cholesterol>300</cholesterol><sodium>2400</sodium><carb>300</carb><fiber>25</fiber><protein>50</protein></daily-values><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving>29</serving><total-fat>11</total-fat><saturated-fat>3</saturated-fat><cholesterol>5</cholesterol><sodium>210</sodium><carb>2</carb><fiber>0</fiber><protein>1</protein><vitamins><a>0</a><c>0</c></vitamins><minerals><ca>0</ca><fe>0</fe></minerals></food></nutrition>'
  })

  it('should parse XML string to JSON', () => {
    const result = parseString(xmlStr)
    const expectedJson = {
      nutrition: {
        'daily-values': {
          'total-fat': '65',
          'saturated-fat': '20',
          cholesterol: '300',
          sodium: '2400',
          carb: '300',
          fiber: '25',
          protein: '50'
        },
        food: {
          name: 'Avocado Dip',
          mfr: 'Sunnydale',
          serving: '29',
          'total-fat': '11',
          'saturated-fat': '3',
          cholesterol: '5',
          sodium: '210',
          carb: '2',
          fiber: '0',
          protein: '1',
          vitamins: {
            a: '0',
            c: '0'
          },
          minerals: {
            ca: '0',
            fe: '0'
          }
        }
      }
    }

    assert.deepEqual(result, expectedJson)
  })
})
