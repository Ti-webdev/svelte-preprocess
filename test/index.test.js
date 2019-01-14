const { readFileSync } = require('fs')
const { resolve } = require('path')
const {
  compile: svelteCompile,
  preprocess: sveltePreprocess,
} = require('svelte/compiler.js')

const { templateTag, externalSrc, pug } = require('../src/index.js')
const { getLanguage } = require('../src/utils.js')

const getFixtureContent = file =>
  readFileSync(resolve(__dirname, 'fixtures', file))
    .toString()
    .trim()

const doesThrow = async (input, opts) => {
  let didThrow = false
  try {
    await compile(input, opts)
  } catch (err) {
    didThrow = true
  }
  return didThrow
}

const preprocess = async (input, processors) => {
  const { code, dependencies } = await sveltePreprocess(input, processors, {
    filename: resolve(__dirname, 'App.html'),
  })
  return { code, dependencies }
}

const compile = async (input, magicOpts) => {
  const preprocessed = await preprocess(input, magicOpts)
  const { js, css } = svelteCompile(preprocessed.toString(), {
    css: true,
  })

  return { js, css }
}

// describe('markup', () => {
//   it('should unwrap <template> tag', async () => {
//     const template = `<template>
//       <div>Hey</div>
//     </template>`
//     const { code } = await preprocess(template, [externalSrc()])
//     expect(code).toBe('<div>Hey</div>')
//   })

//   it('should read external file as template', async () => {
//     const template = `<template src="./fixtures/template.html"></template>`
//     const { code } = await preprocess(template, [externalSrc()])
//     expect(code).toBe('<div>Hey</div>')
//   })

//   it('should transform template with pug', async () => {
//     const template = `<template lang="pug">${getFixtureContent(
//       'template.pug',
//     )}</template>`
//     const { code } = await preprocess(template, [externalSrc(), pug()])
//     expect(code).toBe('<div>Hey</div>')
//   })
// })
