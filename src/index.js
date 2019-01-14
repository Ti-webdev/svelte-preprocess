const coffeescript = require('./processors/coffeescript.js')
const less = require('./processors/less.js')
const postcss = require('./processors/postcss.js')
const pug = require('./processors/pug.js')
const scss = require('./processors/scss.js')
const stylus = require('./processors/stylus.js')
const externalSrc = require('./processors/externalSrc.js')

module.exports = {
  /** Markup */
  externalSrc,
  pug,
  /** Script */
  coffeescript,
  coffee: coffeescript,
  /** Style */
  less,
  scss,
  sass: scss,
  stylus,
  postcss,
}
