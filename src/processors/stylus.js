const stylus = require('stylus')

const { getIncludePaths, getLanguage } = require('../utils.js')

module.exports = options => ({
  style({ content, filename, attributes }) {
    const lang = getLanguage(attributes, 'css')

    if (lang !== 'stylus') return { code: content }

    options = {
      includePaths: getIncludePaths(filename),
      ...options,
    }

    return new Promise((resolve, reject) => {
      const style = stylus(content, {
        filename,
        sourcemap: true,
        ...options,
      })

      style.render((err, css) => {
        if (err) reject(err)

        resolve({
          code: css,
          map: style.sourcemap,
        })
      })
    })
  },
})
