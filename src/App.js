import Header from './Header.js';
import PostList from './PostList.js';

import { fetchPostAll } from './API.js';
import { useStateObserver } from './util.js';


class App {
  constructor(root) {
    console.log('App init');
    this.root = root;
    this.fragment = document.createDocumentFragment();
    useStateObserver(this.state);
  }

  state = {
    postList: [],
  };

  methods = {
    
  };

  components() {
    const parent = this.fragment;
    const state = this.state;

    return [
      new Header({ parent }),
      new PostList({ parent, state }),
    ];
  };

  render() {
    this.components().forEach(item => item.render());
    this.root.appendChild(this.fragment);
    console.log('App rendered');
  }
}

export function mountApp(selector) {
  const root = document.querySelector(selector);
  const app = new App(root);
  app.render();
}
