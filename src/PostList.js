import Component from './Component.js';
import InfiniteLoader from './InfiniteLoader.js';

export default class PostList extends Component {
  template = `
    <main>
      <h2>PostList</h2>
      <section class="post-container"></section>
      <div class="post-loading-circle">Loading</div>
    </main>
  `;

  constructor({ parent, state, stateObserver }) {
    super({ parent, state, stateObserver });
    this.init();

    this.container = this.selectElement('.post-container');
  }

  beforeRender() {
    this.stateObserver.subscribe('postList', this.container, this.update);

    const infiniteLoader = new InfiniteLoader({
      parent: this.selectElement('main'),
      state: this.state,
      stateObserver: this.stateObserver
    });
    
    infiniteLoader.render();
  }

  update = e => {
    const { target } = e;
    const lastIndex = target.lastChild?.getAttribute('key') * 1 || -1;
    this.appendPostList(target, lastIndex + 1);
    console.log('update PostList');
  }

  appendPostList(target, startIndex) {
    const PostListItem = (key) => `<div class="post-item" key="${key}"> ${key} </div>`;

    const newPostList = this.state.postList
      .slice(startIndex)
      .reduce((acc, post, index) => acc + PostListItem(startIndex + index), '');

    target.insertAdjacentHTML('beforeend', newPostList);

  }
}
