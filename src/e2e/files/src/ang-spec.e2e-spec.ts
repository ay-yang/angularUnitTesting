// e2e tests angular

//NOTE:
// launch selenium web driver with: webdriver-manager start (can launch this command from any directory)
// then must launch heroes app: npm start
// then run this command to start e2e tests: protractor (path of)protractor.conf.js

import { async } from '@angular/core/testing';

import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

import { AppPage } from "./app.po";

describe('Protractor Demo App VERSION 2', ()=> { // dummy demo
  it('should have a title (synchronous syntax)', () => {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
  });
});

describe('Angular tour of heroes test', function() {

  beforeEach(async() => {
    await browser.get('http://localhost:4200/'); // assumes this is where the app is running
  });

  it('should have title', () => {
    expect(browser.getTitle()).toEqual('App Under Test');
  });

  it('should have page title', () => {
    expect($('h1'). //the equivalent of element(by.css('h1'));
    getAttribute('innerText')).toEqual("Test Tour of Heroes");
  });

  it('should navigate to Dashboard component immediately', async() => {
    await expect($('app-dashboard')).toBeTruthy();
  });

  it('should navigate to about component and show title: ', async() => {
    await $('a[routerLink="/about"]').click();
    await expect($('h2').getAttribute('innerText')).toEqual("About"); // checks title
  });

  it('should show navigations', () => {
    ($$("a")).then( routers => { // find all "a" elements, the equivalent of element.all(by.css('a'));
      expect(routers[0].getText()).toEqual('Dashboard');
      expect(routers[1].getText()).toEqual('Heroes');
      expect(routers[2].getText()).toEqual('About');
    })
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

describe('Angular tour of heroes test with AppPage', function() {
  let appPage: AppPage;

  beforeEach(async() => {
    // fixture = TestBed.createComponent(AppComponent);
    appPage = new AppPage();
    await appPage.navigateTo();
  });

  it('should have page title', async() => {
    const title = appPage.getTitleText();
    expect(title).toBe("Test Tour of Heroes");
  });

  it('should show navigations (using appPage)', async() => {
    appPage.getRouters().then(routers => {
      expect(routers[0].getText()).toEqual('Dashboard');
      expect(routers[1].getText()).toEqual('Heroes');
      expect(routers[2].getText()).toEqual('About');
    })
  });
});
