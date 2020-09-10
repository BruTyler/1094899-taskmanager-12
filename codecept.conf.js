const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: `./src/tests/e2e/*.test.js`,
  output: `./e2e-output`,
  helpers: {
    Puppeteer: {
      url: `http://localhost:8082`,
      show: false,
      windowSize: `1200x900`,
    }
  },
  bootstrap: null,
  mocha: {},
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}
