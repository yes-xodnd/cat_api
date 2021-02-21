import Component from './_Component.js';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  template = `
    <main>
      <h2>PostList</h2>
      <ul></ul>
    </main>
  `;

  beforeRender() {
    this.ul = this.selectElement('ul');
    
  }
}