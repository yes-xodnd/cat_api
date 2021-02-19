import { createTemplateFragment } from './util.js';


class App {

  methods = {
    createTemplateFragment,
  };

  constructor(el) {
    console.log('App mounted');
    this.el = el;
  }
}

export function mountApp(selector) {
  const el = document.querySelector(selector);
  new App(el);
}