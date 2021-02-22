import Component from './_Component.js';
import { fetchPostAll } from './API.js';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  template = `
    <main>
      <h2>PostList</h2>
    </main>
  `;

  async created() {
    const postList = await fetchPostAll();
    this.state.$set('postList', postList);
  }

  beforeRender() {
    this.main = this.selectElement('main');
    this.state.$observe('postList', this.main, this.update);
    this.main.appendChild(this.getPostList());
  }

  update = e => {
    e.target.appendChild(this.getPostList());
  }

  getPostList() {
    const t = document.createDocumentFragment();
    this.state.postList.forEach(post => {
      const item = new PostListItem({ parent: t, post });
      item.render();
    });
    return t;
  }
}

class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  template = () => {
    const { id, userId, title, body } = this.post;
    return `
      <article>${ body }</article>
    `;
  }
}