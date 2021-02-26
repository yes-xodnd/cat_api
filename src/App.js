import Header from './Header.js';
import PostList from './PostList.js';

import { StateObserver } from './util.js';


class App {
  constructor(root) {
    console.log('App init');
    this.root = root;
    this.fragment = document.createDocumentFragment();
    this.stateObserver = new StateObserver(this.state);
  }

  state = {
    postList: [],
    isLoading: false,
  };

  methods = {
    
  };

  components() {
    const parent = this.fragment;
    const state = this.state;
    const stateObserver = this.stateObserver;

    return [
      new Header({ parent }),
      new PostList({ parent, state, stateObserver }),
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
