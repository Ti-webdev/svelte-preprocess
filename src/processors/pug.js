const pug = require('pug')

module.exports = (options = {}) => ({
  markup({ content, filename }) {
    const code = pug.render(content, {
      doctype: 'html',
      filename,
      ...options,
    })

    return { code }
  },
})
