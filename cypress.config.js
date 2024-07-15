const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const { JwtCreation } = require('@jc21/cypress-jwt-creation')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'e2e/integration/*.test.js',
    supportFile: 'e2e/support/index.js',

    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        webpackPreprocessor(webpackPreprocessor.defaultOptions)
      )
      on('task', JwtCreation(config))
      return config
    }
  },
  env: {
    jwtPrivateKey: `${process.cwd()}/e2e/privatekey.txt`
  },
  fixturesFolder: 'e2e/fixtures',
  screenshotsFolder: 'e2e/screenshots',
  videosFolder: 'e2e/videos',
  video: false
})
