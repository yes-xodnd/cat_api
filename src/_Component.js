export default class Component {
  constructor(props) {
    Object.keys(props).forEach(item => this[item] = props[item]);
  }

  init() {
    const t = document.createElement('template');
    t.innerHTML = (typeof this.template === 'function')
                     ? this.template()
                     : this.template;
    this.fragment = t.content.cloneNode(true);
  }

  selectElement(selector) {
    return this.fragment.querySelector(selector);
  }

  beforeRender() {}

  render() {
    this.beforeRender();
    this.parent.appendChild(this.fragment);
  }
}