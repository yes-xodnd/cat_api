export default class Component {
  constructor(props) {
    Object.keys(props).forEach(item => this[item] = props[item]);
  }

  template() { return ``; }

  init() {
    const t = document.createElement('template');
    const template = (typeof this.template === 'function')
                     ? this.template()
                     : this.template;

    t.innerHTML = template;
    this.fragment =  t.content.cloneNode(true);
  }

  beforeRender() {}

  render() {
    this.beforeRender();
    this.parent.append(this.fragment);
  }
}