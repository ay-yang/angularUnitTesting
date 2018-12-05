import { browser, by, element, $ } from 'protractor';

// helper component
export class AppPage {
  navigateTo() {
    return browser.get('http://localhost:4200/dashboard');
  }

  getTitleText() {
    return ($('h1')).getText();
  }

  getRouters() {
    return element.all(by.css('a'));
  }
}
