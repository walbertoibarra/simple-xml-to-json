'use strict'

const _ = require('lodash')

const NodeType = require('./node-type')

const buildJson = (xmlDoc) => {
  const result = {}

  if (hasOnlyTextNode(xmlDoc)) {
    return xmlDoc[0].data
  }

  const elementNodes = _.filter(xmlDoc, { type: NodeType.element })
  const length = elementNodes.length

  for (let i = 0; i < length; i++) {
    const node = elementNodes[i]

    result[node.tagName] = buildJson(node.childNodes)
  }

  return result
}

const hasOnlyTextNode = (xmlDoc) => {
  if (xmlDoc.length > 1) return false

  const count = _.countBy(xmlDoc, 'type')

  if (_.has(count, NodeType.text)) return true

  return false
}

module.exports = {
  buildJson,
  hasOnlyTextNode
}
