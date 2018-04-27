// Karma configuration
// Generated on Wed Nov 22 2017 13:51:54 GMT+0000 (GMT)

// Sort out the chrome binary with Puppeteer from Google.
process.env.CHROME_BIN = require('puppeteer').executablePath();

// TODO: This could be broken up, but I can't find any good documentation on how.
module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'requirejs', 'chai', 'sinon', 'jquery-3.2.1'],

    files: [

      {pattern: 'node_modules/chai/chai.js', included: true},
      {pattern: 'node_modules/mocha/mocha.js', included: true},
      {pattern: 'node_modules/lolex/lolex.js', included: false},

      'test-main.js',

      {pattern: 'src/**/*.js', included: false},
      {pattern: 'test/**/*.js', included: false},
    ],

    client: {
      mocha: {
        ui: 'bdd',
      },
    },

    reporters: ['progress', 'coverage', 'growl'],

    preprocessors: {
      // 'src/**/*.js': ['coverage']
    },

    port: 9876,
    colors: true,
    captureTimeout: 600000,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    browsers: ['ChromeNoSandbox'],

    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/'},
        {type: 'lcov', dir: 'lcov/'},
      ]
    },

    customLaunchers: {
      ChromeNoSandbox: {
        base: 'ChromeHeadless',
        /* WARN: This is bad, but needed.
           Puppeteer uses bleeding edge
           binaries that don't get along
           with my kernel. */
        flags: ['--no-sandbox']
      }
    },

    singleRun: false,
    concurrency: Infinity,
  })
};
