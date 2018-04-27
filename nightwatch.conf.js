const seleniumServer = require('selenium-server');
const chromedriver = require('puppeteer').executablePath()

module.exports = {
  'src_folders': ['integration-tests'],
  'output_folder': 'integration-test-reports',

  'selenium': {
    'start_process': true,
    'host': '127.0.0.1',
    'server_path': 'node_modules/selenium-server/lib/runner/selenium-server-standalone-3.11.0.jar',
    'port': 4444,
    'log_path': '',
    'cli_args': {
      'webdriver.gecko.driver': 'node_modules/geckodriver/bin/geckodriver'
    }
  },
  'test_settings': {
    'default': {
      'launch_url': 'http://localhost:8000',
      'selenium_port': '4444',
      'selenium_host': 'localhost',
      'desiredCapabilities': {
        'browserName': 'firefox',
        'marionette': true,
        'javascriptEnabled': true
      }
    }
  }
};
