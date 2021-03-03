import Component from './Component.js';

// components
import Header from './Header.js';
import PostList from './PostList.js';
import Home from './Home.js';
import { useRouter } from './router.js';

export default class App extends Component {
  
  state = {
    postList: [],
    isLoading: false,
  };
  
  constructor(props) {
    super(props);
    this.init();
    
    const [setState, subscribe] = this.useStateObserver(this.state);

    this.appendComponent(Header);
    
    const router = useRouter(this);
    const state = this.state;

    router
      .registerPath(
        '/',
        [ Home ]
      )
      .registerPath(
        '/posts', 
        [ PostList, {state, setState, subscribe } ]
      )
      .init();
  }
}


export function mountApp(selector) {
  const root = document.querySelector(selector);
  const app = new App({ parent: root });
  app.render();
}
