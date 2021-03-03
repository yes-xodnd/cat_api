import Component from './Component.js';
import { navigate } from './router.js';


export default class Home extends Component {

  template =  `
    <ul>
      <button>posts</button>
    </ul>
  `;

  constructor(props) {
    super(props);
    this.init();
    this.addListener('button', 'click', () => navigate('/posts'));
  }
}