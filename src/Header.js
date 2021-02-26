import Component from './Component.js';

export default class Header extends Component {
  
  template = `<header><h1>JS Practice Demo</h1></header>`;
  
  constructor(props) {
    super(props);
    this.init();
  }
}