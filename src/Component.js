import StateObserver from './util.js';

/**
 * Props
 * @typedef {Object} Props
 * @property {Element} parent
 */

export default class Component {
  /**
   * register every property in props object
   * @param {Props} props
   */
  constructor(props) {
    this.parent = props.parent;
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

  getFragment() {
    return this._fragment;
  }

  selectElement(selector) {
    return this._fragment.querySelector(selector);
  }

  appendComponent(...args) {
    args.forEach(([component, props]) => {
      const child = new component(props);
      child.render();
    });
  }

  useStateObserver() {
    
  }

  _createTemplateFragment(template) {
    const t = document.createElement('template');
    t.innerHTML = (typeof template === 'string')   ? template
                : (typeof template === 'function') ? template()
                : null;
    return t.content.cloneNode(true);
  }
}

