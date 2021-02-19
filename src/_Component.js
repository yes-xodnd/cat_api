export default class Component {
  constructor(props) {
    Object.keys(props).forEach(item => this[item] = props[item]);
  }

  init() {
    const t = document.createElement('template');
    const template = (typeof this.template === 'function')
                     ? this.template()
                     : this.template;

    t.innerHTML = template;
    this.fragment = t.content.cloneNode(true);
  }

  selectElement(selector) {
    return this.fragment.querySelector(selector);
  }

  beforeRender() {}

  render() {
    this.beforeRender();
    console.log(this.fragment)
    this.parent.appendChild(this.fragment);
  }
}