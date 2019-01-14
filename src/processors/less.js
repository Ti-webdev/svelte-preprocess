const less = require('less/lib/less-node')

module.exports = options => ({
  style({ content, filename }) {
    return less
      .render(content, {
        sourceMap: {},
        ...options,
      })
      .then(output => ({
        code: output.css,
        map: output.map,
      }))
  },
})
