import Component from './_Component.js';

export default class Header extends Component {
  
  constructor(props) {
    super(props);
    this.init();
  }

  template = `<header><h1>JS Practice Demo</h1></header>`;
}