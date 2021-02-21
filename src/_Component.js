export default class Component {
  constructor(props) {
    Object.keys(props).forEach(item => this[item] = props[item]);
  }

  init() {
    this.fragment = this.createTemplateFragment();
  }
  
  render() {
    if (this.beforeRender) this.beforeRender();
    this.parent.appendChild(this.fragment);
  }

  // util methods
  selectElement(selector) {
    return this.fragment.querySelector(selector);
  }

  createTemplateFragment() {
    const t = document.createElement('template');
    t.innerHTML = (typeof this.template === 'function')
                      ? this.template()
                      : this.template;
    return t.content.cloneNode(true);
  }
}

