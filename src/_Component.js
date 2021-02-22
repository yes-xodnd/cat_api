export default class Component {
  constructor(props) {
    Object.keys(props).forEach(item => this[item] = props[item]);
  }

  init() {
    if (this.created) this.created();
    this.fragment = this.createTemplateFragment(this.template);
  }
  
  render() {
    if (this.beforeRender) this.beforeRender();
    this.parent.appendChild(this.fragment);
  }

  // util methods
  selectElement(selector) {
    return this.fragment.querySelector(selector);
  }

  createTemplateFragment(template) {
    const t = document.createElement('template');
    const type = typeof template;
    t.innerHTML = (type === 'function') ? template()
                : (type === 'string')   ? template
                : console.error('template은 함수 또는 문자열이어야 합니다.');
    return t.content.cloneNode(true);
  }
}

