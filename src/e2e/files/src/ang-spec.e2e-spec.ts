// e2e tests angular

//NOTE:
// launch selenium web driver with: webdriver-manager start (can launch this command from any directory)
// then must launch heroes app: npm start
// then run this command to start e2e tests: protractor (path of)protractor.conf.js

// OR run: npm run e2e -- --no-webdriver-update

import { async, TestBed } from '@angular/core/testing';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

import { AppPage } from "./app.po";
import { InMemoryDataService } from "../../../app/in-memory-data.service";

describe('Protractor Demo App VERSION 2', ()=> { // dummy demo
  it('should have a title (synchronous syntax)', () => {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
  });
});

describe('Angular tour of heroes test', function() {

  beforeEach(async() => {
    await browser.get('http://localhost:4200/'); // assumes this is where the app is running
    browser.waitForAngular();
  });

  it('should have title', () => {
    expect(browser.getTitle()).toEqual('App Under Test');
  });

  it('should have page title', () => {
    expect($('h1'). //the equivalent of element(by.css('h1'));
    getAttribute('innerText')).toEqual("Test Tour of Heroes");
  });

  // As a user, I can see the dashboard upon launching the app
  it('should navigate to Dashboard component immediately', async() => {
    browser.getCurrentUrl().then((url)=>{
      expect(url).toEqual('http://localhost:4200/dashboard'); //check link
      expect($('app-dashboard')).toBeTruthy();
    });
  });

  it('should navigate to about component and show title: ', async() => {
    $('a[routerLink="/about"]').click().then((page)=> {
      browser.getCurrentUrl().then((url)=>{
        browser.pause();
        expect(url).toEqual('http://localhost:4200/'); //check link
        expect(url).toEqual('http://localhost:4200/about'); //check link
      });
      expect($('h2').getAttribute('innerText')).toEqual("About"); // checks title
      expect($('ng-component')).toBeTruthy();
    });
  });

  it('should show navigations', async() => {
    await ($$("a")).then( routers => { // find all "a" elements, the equivalent of element.all(by.css('a'));
      expect(routers[0].getText()).toEqual('Dashboard');
      expect(routers[1].getText()).toEqual('Heroes');
      expect(routers[2].getText()).toEqual('About');
    })
  });

  // works
  it('should navigate to heroes component and show title: ', async() => {
    $('a[routerLink="/heroes"]').click().then((page)=>{
      browser.getCurrentUrl().then((url)=>{
        expect(url).toEqual('http://localhost:4200/heroes'); //check link
      });
      expect($('app-heroes')).toBeTruthy();
      expect($('h2').getAttribute('innerText')).toEqual("My Heroes"); // checks title
    });
  });

  // As a user, I can click on a hero's button and see that hero's details
  it('should navigate to hero details: ', async() => {
    const memory = new InMemoryDataService();
    const data = memory.createDb().heroes;
    let currentUrl: string

    $$('.hero').then(function(heroes) {
      expect(heroes.length).toBeGreaterThan(1, "no heroes found");
      if(heroes.length > 1){
        heroes[0].click(); // try to click on the first hero
        currentUrl = "http://localhost:4200/heroes/" + data[0].id;
        browser.getCurrentUrl().then((url)=>{
          expect(url).toEqual(currentUrl, "failed to navigate"); //check link
        });
      }
    });
      expect($('app-hero-detail')).toBeTruthy();
  });

  // note: in real world applications some navigation takes time to execute, so this async version is better generally speaking
  // http://www.protractortest.org/#/async-await
  it('should navigate to heroes component and show title: (async)', async() => {
    await $('a[routerLink="/heroes"]').click();
    await expect($('app-heroes')).toBeTruthy();
    await expect($('h2').getAttribute('innerText')).toEqual("My Heroes"); // checks title
  });

  // xit('should fail this', async() => {
  //   browser.get("http://localhost:4200/not-found").then((url)=>{
  //     expect(url).toEqual("http://localhost:4200/not-found");
  //     browser.debugger();
  //   });
  // });

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

  it('should navigate to Dashboard component', async() => {
    browser.getCurrentUrl().then((url)=>{
      expect(url).toEqual('http://localhost:4200/dashboard'); //check link
      expect($('app-dashboard')).toBeTruthy();
    });
  });

  it('should show navigations (using appPage)', async() => {
    appPage.getRouters().then(routers => {
      expect(routers[0].getText()).toEqual('Dashboard');
      expect(routers[1].getText()).toEqual('Heroes');
      expect(routers[2].getText()).toEqual('About');
    })
  });
});
