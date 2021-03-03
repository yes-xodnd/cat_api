import Component from './Component.js';
import InfiniteLoader from './InfiniteLoader.js';
import PostListLoading from './PostListLoading.js';
import { fetchPostList } from './API.js';

export default class PostList extends Component {
  template = `
    <main>
      <section class="post-container"></section>
    </main>
  `;

  constructor(props) {
    super(props);
    this.init();

    this.props.subscribe(
      'postList',
      this.selectElement('.post-container'),
      this.updatePostList
    );

    const parent = this.selectElement('main');
    this.appendComponent(
      InfiniteLoader,
      { 
        parent,
        handler: this.infiniteLoaderHandler,
      }
    );

    this.appendComponent(
      PostListLoading,
      {
        parent,
        state: this.props.state,
        subscribe: this.props.subscribe
      }
    );
    
    if (!this.props.state.postList.length) {
      this.infiniteLoaderHandler();
    } else {
      this.appendPostList(this.selectElement('.post-container'), 0);
    }
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


