
class App {
  constructor(el) {
    console.log('App mounted');
    this.el = el;
  }
}

export function mountApp(selector) {
  const el = document.querySelector(selector);
  new App(el);
}