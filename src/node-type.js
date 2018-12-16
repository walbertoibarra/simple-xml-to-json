'use strict'

const NodeType = {
  element: 'element',
  text: 'text',
  properties: {
    'element': { id: 'element', name: 'Element', description: 'Element node' },
    'text': { id: 'element', name: 'Text', description: 'Text node' }
  }
}

module.exports = Object.freeze(NodeType)
