import Component from './Component.js';
import InfiniteLoader from './InfiniteLoader.js';
import { fetchPostList } from './API.js';

export default class PostList extends Component {
  template = `
    <main>
      <section class="post-container"></section>
      <div class="post-loading">
        <div class="circle"></div>
      </div>
    </main>
  `;

  constructor(props) {
    super(props);
    this.init();
  }

  beforeRender() {
    this.props.subscribe(
      'postList',
      this.selectElement('.post-container'),
      this.updatePostList
    );

    this.props.subscribe(
      'isLoading',
      this.selectElement('.post-loading'),
      this.toggleLoading
    );

    // add infinite loader

    this.appendComponent([
      InfiniteLoader,
      { 
        parent: this.selectElement('main'),
        handler: this.infiniteLoaderHandler,
      }
    ]);
  }

  updatePostList = e => {
    const { target } = e;
    const lastIndex = target.lastChild?.getAttribute('key') * 1 || -1;
    this.appendPostList(target, lastIndex + 1);
    console.log('update PostList');
  }

  appendPostList(target, startIndex) {
    const PostListItem = (key) => `<div class="post-item" key="${key}"> ${key} </div>`;

    const newPostList = this.props.state.postList
      .slice(startIndex)
      .reduce((acc, post, index) => acc + PostListItem(startIndex + index), '');

    target.insertAdjacentHTML('beforeend', newPostList);
  }

  toggleLoading = e => {
    e.target.style.display = (this.props.state.isLoading) ? 'block' : 'none';
  }

  infiniteLoaderHandler = async () => {
    this.props.setState('isLoading', true);
    
    const newPostList = await fetchPostList(10);
    this.props.setState(
      'postList',
      [ ...this.props.state.postList, ...newPostList ]
    );
    
    this.props.setState('isLoading', false);
  }
}


