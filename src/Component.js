export default class Component {
  /**
   * register every property in props object
   * @param {object} props
   */
  constructor(props) {
    Object.keys(props).forEach(item => this[item] = props[item]);
  }

  /**
   * call created() method & create DocumentFragment with template
   */
  init() {
    if (this.created) this.created();
    this._fragment = this._createTemplateFragment(this.template);
  }

  /**
   * calls beforeRender() method & append component to parent
   */
  render() {
    if (this.beforeRender) this.beforeRender();
    this.parent.appendChild(this._fragment);
  }

  selectElement(selector) {
    return this._fragment.querySelector(selector);
  }

  _createTemplateFragment(template) {
    const t = document.createElement('template');
    t.innerHTML = (typeof template === 'string')   ? template
                : (typeof template === 'function') ? template()
                : null;
    return t.content.cloneNode(true);
  }
}

