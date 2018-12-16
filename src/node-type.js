'use strict'

const NodeType = {
  element: 1,
  text: 2,
  properties: {
    '1': { id: 1, name: 'Element', description: 'Element node' },
    '2': { id: 2, name: 'Text', description: 'Text node' }
  }
}

module.exports = Object.freeze(NodeType)
