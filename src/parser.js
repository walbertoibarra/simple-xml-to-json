'use strict'

const NodeType = require('./node-type')

const parseString = (str) => {}

const getTextNode = (str) => {
  const textNode = {}

  textNode.type = NodeType.text
  textNode.data = str

  return textNode
}

const getElementNode = (tag, index) => {
  const elementNode = {}

  elementNode.type = NodeType.element
  elementNode.innerXml = tag.innerXml
  elementNode.tagName = tag.openTag.tagName
  // elementNode.childNodes = parseTag(tag.innerXml, index)

  return elementNode
}

const getTag = (str, index) => {
  const tag = {}

  tag.openTag = getOpenTag(str, index)

  if (tag.openTag.start > index || tag.openTag.start === -1) {
    return str.substring(index, tag.openTag.start === -1 ? undefined : tag.openTag.start)
  }

  tag.closeTag = getCloseTag(str, tag.openTag)
  tag.innerXml = str.substring(tag.openTag.end + 1, tag.closeTag.start)

  return tag
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

const getOpenTag = (str, index) => {
  const openTag = {}

  openTag.start = str.indexOf('<', index)
  openTag.end = str.indexOf('>', openTag.start)
  openTag.tagName = str.substring(openTag.start + 1, openTag.end)

  return openTag
}

module.exports = {
  getCloseTag,
  getElementNode,
  getOpenTag,
  getTag,
  getTextNode,
  parseString
}
