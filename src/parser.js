'use strict'

const parseString = (str) => {}

const _getOpenTag = (str, index) => {
  const openTag = {}

  openTag.start = str.indexOf('<', index)
  openTag.end = str.indexOf('>', openTag.start)
  openTag.tagName = str.substring(openTag.start + 1, openTag.end)

  return openTag
}

const _getCloseTag = (str, openTag) => {
  const closeTag = {}

  closeTag.start = str.lastIndexOf(`</${openTag.tagName}>`)
  closeTag.end = str.indexOf('>', closeTag.start)
  closeTag.tagName = str.substring(closeTag.start + 1, closeTag.end)

  return closeTag
}

module.exports = {
  parseString,
  _getOpenTag,
  _getCloseTag
}
