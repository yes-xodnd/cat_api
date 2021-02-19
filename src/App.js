import Header from './Header.js';

// import { fetchArticleAll } from './API.js';

class App {

  constructor(root) {
    console.log('init App');
    this.root = root;
  }
  
  fragment = document.createDocumentFragment();

  // state = {
  // };

  // methods = {
  //   fetchArticleAll,
  // };

  components = [
    new Header({ parent: this.fragment }),
  ];

  render() {
    this.components.forEach(item => item.render());
    this.root.appendChild(this.fragment);
    console.log('App rendered');
  }
}

export function mountApp(selector) {
  const root = document.querySelector(selector);
  const app = new App(root);
  app.render();
}
