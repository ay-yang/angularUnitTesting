const config = require('./src/e2e/files/protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox', '--remote-debugging-port=9222', '--disable-gpu']
  }
};

exports.config = config;
