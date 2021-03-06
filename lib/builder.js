'use strict'

const _ = require('lodash')

const NodeType = require('./node-type')

const buildObject = (xmlDoc) => {
  const result = {}

  if (hasOnlyTextNode(xmlDoc)) {
    const data = xmlDoc[0].data.trim()

    const slashInvalidIndex = data.indexOf('/')
    const gtInvalidIndex = data.indexOf('>')

    if (slashInvalidIndex !== -1 || gtInvalidIndex !== -1) {
      const index = Math.min(
        slashInvalidIndex > -1 ? slashInvalidIndex : Infinity,
        gtInvalidIndex > -1 ? gtInvalidIndex : Infinity
      )
      const invalidChar = data[index]

      throw new Error(`Invalid character "${invalidChar}" found`)
    }

    return data
  }

  const elementNodes = _.filter(xmlDoc, { type: NodeType.element })
  const length = elementNodes.length

  for (let i = 0; i < length; i++) {
    const node = elementNodes[i]
    const data = node.childNodes.length ? buildObject(node.childNodes) : null

    result[node.tagName] = data
  }

  return result
}

const hasOnlyTextNode = (xmlDoc) => {
  if (xmlDoc.length > 1) return false

  if (_.get(xmlDoc, '[0].type') === NodeType.text) return true

  return false
}

module.exports = {
  buildObject,
  hasOnlyTextNode
}
