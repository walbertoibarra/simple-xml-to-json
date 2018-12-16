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

  if (tag.openTag.start > index || (tag.openTag.start === -1 && index < str.length - 1)) {
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

  return openTag
}

const getCloseTag = (str, openTag) => {
  const closeTag = {}

  closeTag.start = str.lastIndexOf(`</${openTag.tagName}>`)
  // TODO: Validate there are no other tags with the same name on sibling
  // or child elements.
  closeTag.end = str.indexOf('>', closeTag.start)
  closeTag.tagName = str.substring(closeTag.start + 1, closeTag.end)

  return closeTag
}

const getElementNode = (tag) => {
  const elementNode = {}

  elementNode.type = NodeType.element
  elementNode.innerXml = tag.innerXml
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
  parseString
}
