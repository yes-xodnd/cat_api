import Component from './Component.js';
import ButtonColorScheme from './ButtonColorScheme.js';

export default class Header extends Component {
  
  template = `
    <header class="header">
      <h1>JavaScript Practice</h1>
    </header>
  `;
  
  constructor(props) {
    super(props);
    this.init();
    
    this.appendComponent(
      ButtonColorScheme,
      { parent: this.selectElement('header') }
    );
  }
}