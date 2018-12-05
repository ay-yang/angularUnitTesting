import { browser } from 'protractor';

const { SpecReporter } = require('jasmine-spec-reporter');
const env = require('../environment.js');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    // For Travis CI only
  },
  directConnect: true,
  // baseUrl: 'http://localhost:4444/',
  // if launching server
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    // var defer = protractor.promise.defer();
    browser.ignoreSynchronization = true;

    // browser.get('http://localhost:4444/wd/hub').end(function(err, resp) {
    //     if (err || !resp.ok) {
    //         log("there is an error " + err.message);
    //         defer.reject(resp);
    //     } else {
    //         global.sysid = resp.sysid;
    //         defer.fulfill(resp);
    //     }
    // });

    // return defer.promise;
  }
};
