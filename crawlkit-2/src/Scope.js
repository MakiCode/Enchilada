'use strict'; // eslint-disable-line

const Chance = require('chance');
const objectAssign = require('object-assign');

const AlreadySetError = require('./errors').AlreadySetError;

const urlKey = Symbol('url');
const idKey = Symbol('id');
const resultKey = Symbol('result');
const tryKey = Symbol('try');
const stopKey = Symbol('stop');
const browserKey = Symbol('browser');
const pageKey = Symbol('page');

class Scope {

  constructor(url) {
    this[tryKey] = 0;
    this[resultKey] = {};
    this[urlKey] = url;
    this[stopKey] = false;
  }

  get id() {
    return this[idKey] || (this[idKey] = new Chance().name());
  }

  get tries() {
    return this[tryKey];
  }

  get url() {
    return this[urlKey];
  }

  retry() {
    this[tryKey] += 1;
  }

  get result() {
    return this[resultKey];
  }

  isStopped() {
    return this[stopKey];
  }

  stop() {
    this[stopKey] = true;
  }

  setBrowser(browser) {
    if (this.browser) {
      throw new AlreadySetError();
    }
    this[browserKey] = browser;
  }

  clearBrowser() {
    this[browserKey] = undefined;
  }

  get browser() {
    return this[browserKey];
  }

  setPage(page) {
    if (this.page) {
      throw new AlreadySetError();
    }
    this[pageKey] = page;
  }

  get page() {
    return this[pageKey];
  }

  clone() {
    const clone = new Scope(this.url);
    clone[tryKey] = this.tries;
    clone[resultKey] = objectAssign({}, this.result);
    delete clone[resultKey].error;
    return clone;
  }
}

module.exports = Scope;
