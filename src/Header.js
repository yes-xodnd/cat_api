import Component from './Component.js';

export default class Header extends Component {
  
  template = `
    <header class="header">
      <h1>JS PRACTICE DEMO</h1>
    </header>
  `;
  
  constructor(props) {
    super(props);
    this.init();
  }
}