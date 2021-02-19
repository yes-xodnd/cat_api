export default class Component {
  constructor(props) {
    Object.keys(props).forEach(item => this[item] = props[item]);

    this.template = Function; // Mandatory
    this.beforeRender = Function; // Optional
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

  render() {
    this.beforeRender();
    this.parent.appendChild(this.fragment);
  }
}