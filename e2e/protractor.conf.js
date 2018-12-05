// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '*.js',
    // '*.e2e-spec.ts'
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
