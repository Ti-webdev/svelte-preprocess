const coffeescript = require('coffeescript')

module.exports = options => ({
  script({ content, filename }) {
    const { js: code, sourceMap: map } = coffeescript.compile(content, {
      filename,
      sourceMap: true,
      ...options,
    })

    return { code, map }
  },
})
