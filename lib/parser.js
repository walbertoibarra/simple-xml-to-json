'use strict'

const NodeType = require('./node-type')

const parseString = (str) => {
  const nodes = []
  let index = 0

  while (true) {
    const tag = getTag(str, index)

    if (tag === null) {
      break
    }

    if (typeof tag === 'object') {
      const elementNode = getElementNode(tag)

      nodes.push(elementNode)
      index = tag.closeTag.end + 1
    }

    if (typeof tag === 'string') {
      const textNode = getTextNode(tag)

      nodes.push(textNode)
      index += tag.length
    }
  }

  return nodes
}

const getTag = (str, index) => {
  const tag = {}

  tag.openTag = getOpenTag(str, index)

  if (tag.openTag.start > index || (tag.openTag.start === -1 && index <= str.length - 1)) {
    return str.substring(index, tag.openTag.start === -1 ? undefined : tag.openTag.start)
  }

  if (tag.openTag.start === -1) {
    return null
  }

  tag.closeTag = getCloseTag(str, tag.openTag)
  tag.innerXml = str.substring(tag.openTag.end + 1, tag.closeTag.start)

  return tag
}

const getOpenTag = (str, index) => {
  const openTag = {}

  openTag.start = str.indexOf('<', index)
  openTag.end = str.indexOf('>', openTag.start)
  openTag.tagName = str.substring(openTag.start + 1, openTag.end)

  if (openTag.start === index && openTag.end !== -1) {
    const ltInvalidIndex = openTag.tagName.indexOf('<')
    const slashInvalidIndex = openTag.tagName.indexOf('/')

    if (ltInvalidIndex !== -1 || slashInvalidIndex !== -1) {
      const index = Math.min(
        ltInvalidIndex > -1 ? ltInvalidIndex : Infinity,
        slashInvalidIndex > -1 ? slashInvalidIndex : Infinity
      )
      const tagName = openTag.tagName.substring(0, index)

      throw new Error(`Element type "${tagName}" must be followed by ">"`)
    }
  }

  return openTag
}

const getCloseTag = (str, openTag) => {
  const closeTag = {}
  const openTagRepeated = indicesOf(str.substring(openTag.end), `<${openTag.tagName}>`).length
  const closeTags = indicesOf(str.substring(openTag.end), `</${openTag.tagName}>`).map(i => i + openTag.end)
  const indexOfCloseTag = closeTags.length - openTagRepeated - 1

  closeTag.start = closeTags[indexOfCloseTag]
  closeTag.end = str.indexOf('>', closeTag.start)
  closeTag.tagName = str.substring(closeTag.start + 1, closeTag.end)

  if (typeof closeTag.start === 'undefined') {
    throw new Error(`The element type "${openTag.tagName}" must be terminated by the matching close-tag "</${openTag.tagName}>"`)
  }

  return closeTag
}

const indicesOf = (str, searchValue) => {
  const indices = []
  let currentIndex = 0

  while (true) {
    const index = str.indexOf(searchValue, currentIndex)

    if (index === -1) {
      break
    }

    indices.push(index)
    currentIndex = index + searchValue.length
  }

  return indices
}

const getElementNode = (tag) => {
  const elementNode = {}

  elementNode.type = NodeType.element
  elementNode.tagName = tag.openTag.tagName
  elementNode.childNodes = parseString(tag.innerXml)

  return elementNode
}

const getTextNode = (str) => {
  const textNode = {}

  textNode.type = NodeType.text
  textNode.data = str

  return textNode
}

module.exports = {
  getCloseTag,
  getElementNode,
  getOpenTag,
  getTag,
  getTextNode,
  indicesOf,
  parseString
}
