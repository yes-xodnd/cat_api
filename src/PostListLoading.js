import Component from './Component.js';

export default class PostListLoading extends Component {

  template = `
    <div class="post-loading">
      <div class="circle"></div>
    </div>
  `;

  constructor(props) {
    super(props);
    this.init();

    this.props.subscribe(
      'isLoading',
      this.selectElement('.post-loading'),
      this.toggleLoading
    );
  }
  
  toggleLoading = e => {
    const { target } = e;
    const { isLoading } = this.props.state;
    target.style.visibility = (isLoading) ? 'visible' : 'visible';
  }
}