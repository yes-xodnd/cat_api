import Header from './Header.js';
import PostList from './PostList.js';
import Component from './Component.js';

import { StateObserver } from './util.js';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.init();

    const parent = this.getFragment();

    this.appendComponent(
      [ Header, { parent } ],
    );
  }
}









class oldApp {
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
      // new PostList({ parent, state, stateObserver }),
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
  const app = new App({ parent: root });
  app.render();
}
