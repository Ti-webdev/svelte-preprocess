const { getSrcContent, parseAttributes, getLanguage } = require('../utils.js')

const TEMPLATE_PATTERN = new RegExp(
  `<template([\\s\\S]*?)>([\\s\\S]*?)<\\/template>`,
)

const sliceReplace = (match, str, replaceValue) =>
  (
    str.slice(0, match.index) +
    replaceValue +
    str.slice(match.index + match[0].length)
  ).trim()

const getAssetExternalSrc = ({ content, attributes, filename }) => {
  if (attributes && attributes.src) {
    if (attributes.src.match(/^(https?)?:?\/\/.*$/)) {
      return
    }

    content = getSrcContent(filename, attributes.src)

    return { code: content }
  }
}

module.exports = options => ({
  markup({ content, filename }) {
    let dependecies
    const templateMatch = content.match(TEMPLATE_PATTERN)

    /** If no <template> was found, just return the original markup */
    if (!templateMatch) {
      return { code: content }
    }

    let [, attributes, templateCode] = templateMatch

    attributes = parseAttributes(attributes)

    if (attributes.src) {
      templateCode = getSrcContent(filename, attributes.src)
      dependecies = [filename]
    }

    /** If language is HTML, just remove the <template></template> tags */
    return {
      code: sliceReplace(templateMatch, content, templateCode),
      dependecies,
    }
  },
  style: getAssetExternalSrc,
  script: getAssetExternalSrc,
})
