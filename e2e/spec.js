
// e2e tests javascript
//NOTE:
// launch selenium web driver with: webdriver-manager start (can launch this command from any directory)
// then must launch heroes app: npm start
// then run this command to start e2e tests: protractor (path of)protractor.conf.js

describe('Protractor Demo App JS', function() { // just a dummy demo
  it('should have a title (asynchronous syntax)', function() {
    browser.get('http://juliemr.github.io/protractor-demo/').then(
      expect(browser.getTitle()).toEqual('Super Calculator')
    );
  });
});

describe('Angular tour of heroes test (JS)', function() {

  beforeEach(async() => {
    await browser.get('http://localhost:4200/'); // assumes this is where the app is running
  });

  it('should have title', function() {
    expect(browser.getTitle()).toEqual('App Under Test');
  });

  it('should have page title', function() {
    expect($('h1').getAttribute('innerText')).toEqual("Test Tour of Heroes");
  });

  it('should navigate to "Dashboard" immediately', async() => {
    await expect($('app-dashboard')).toBeTruthy();
  });

  it('should navigate to about and show title: ', async() => {
    await $('a[routerLink="/about"]').click();
    await expect($('h2').getAttribute('innerText')).toEqual("About"); // checks title
  });

  // works
  it('should navigate to heroes component and show title: ', () => {
    $('a[routerLink="/heroes"]').click();
    expect($('app-heroes')).toBeTruthy();
    expect($('h2').getAttribute('innerText')).toEqual("My Heroes"); // checks title
  });

  // note: in real world applications some navigation takes time to execute, so this async version is better generally speaking
  // http://www.protractortest.org/#/async-await
  it('should navigate to heroes component and show title: (async)', async() => {
    await $('a[routerLink="/heroes"]').click();
    await expect($('app-heroes')).toBeTruthy();
    await expect($('h2').getAttribute('innerText')).toEqual("My Heroes"); // checks title
  });
});
