import Component from './Component.js';

export default class InfiniteLoader extends Component {

  template = '<div class="infinite-loader" style="height: 10px"></div>';

  constructor(props) {
    super(props);
    this.init();

    const { handler } = props;

    const callback = async ([{ target, isIntersecting }], observer) => {
      if (isIntersecting) {
        console.log('infinite loader intersecting');
        observer.unobserve(target);
        await handler();
        observer.observe(target);
      }
    }

    this.intersectionObserver = new IntersectionObserver(callback, { threshold: 0 });

    const loader = this.selectElement('.infinite-loader');
    this.intersectionObserver.observe(loader);
  }
}