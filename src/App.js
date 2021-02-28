import Header from './Header.js';
import PostList from './PostList.js';
import Component from './Component.js';

export default class App extends Component {

  state = {
    postList: [],
    isLoading: false,
  };

  constructor(props) {
    super(props);
    this.init();

    const [setState, subscribe] = this.useStateObserver(this.state);
    const state = this.state;
    const parent = this.getFragment();

    this.appendComponent(
      [ Header, { parent } ],
      [ PostList, { parent, state, setState, subscribe } ],
    );
  }
}


export function mountApp(selector) {
  const root = document.querySelector(selector);
  const app = new App({ parent: root });
  app.render();
}
