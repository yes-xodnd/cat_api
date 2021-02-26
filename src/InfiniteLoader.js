import Component from './Component.js';
import { fetchPostList } from './API.js';

export default class InfiniteLoader extends Component {

  template = '<div class="infinite-loader" style="height: 100px"></div>';

  constructor(props) {
    super(props);
    this.init();

    const callback = async ([{ target, isIntersecting }], observer) => {
      if (isIntersecting) {
        console.log('infinite loader intersecting');
        observer.unobserve(target);
        this.stateObserver.setState('isLoading', true);

        const newPostList = await fetchPostList(5);
        this.stateObserver.setState(
          'postList',
          [ ...this.state.postList, ...newPostList ]
        );

        this.stateObserver.setState('isLoading', false);
        observer.observe(target);
      }
    }

    this.intersectionObserver = new IntersectionObserver(callback);
  }

  beforeRender() {
    const loader = this.selectElement('.infinite-loader');
    this.intersectionObserver.observe(loader);
  }
}