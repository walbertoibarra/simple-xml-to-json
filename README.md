# Simple XML to JSON

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**Disclaimer**: This is NOT a library to use on your production code, as it can only parse simple XML.

## Instalation

As this is not a package to be used on production, it is not available from NPM, you'll have to install it directly from GitHub, so to use it you will have to: `npm install walbertoibarra/simple-xml-to-json`.

## Usage

As easy as:
~~~ js
'use strict'

const fs = require('fs')

const simpleXmlToJson = require('@walbertoibarra/simple-xml-to-json')


fs.readFile('./person.xml', { encoding: 'utf-8' }, (error, data) => {
  if (error) return console.error(error)

  const parsedJson = simpleXmlToJson.parseString(data)

  console.log(parsedJson) // {"person":{"name":"John Doe","age":"30"}}
})
~~~

Or just pass the hardcoded string:

~~~ js
'use strict'

const simpleXmlToJson = require('@walbertoibarra/simple-xml-to-json')

const xmlStr = '<person><name>John Doe</name><age>30</age></person>'
const parsedJson = simpleXmlToJson.parseString(xmlStr)

console.log(parsedJson) // {"person":{"name":"John Doe","age":"30"}}
~~~

## Limitations

This library does not support:

- Attributes
- Duplicated tag names within same level
- Self-closing tags
