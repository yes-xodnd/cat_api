import { StateObserver } from './util.js';

export default class Component {
  /**
   * @param {{ parent: Element }} props - props from parent component
   */
  constructor(props) {
    const { parent, ..._props } = props;
    this.parent = parent;
    this.props = _props;
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

  /**
   * add event listener on element in the component
   * @param {string} selector 
   * @param {string} type 
   * @param {function} callback 
   * @param {Object} options 
   */
  addListener(selector, type, callback, options) {
    this.selectElement(selector)?.addEventListener(type, callback, options);
  }

  appendComponent(component, props = {}) {
    if (!props.hasOwnProperty('parent')) props.parent = this.parent;
    const child = new component(props);
    child.render();
  }

  useStateObserver(state) {
    const _observer = new StateObserver(state);
    return [_observer.setState, _observer.subscribe];
  }

  _createTemplateFragment(template) {
    const t = document.createElement('template');
    t.innerHTML = (typeof template === 'string')   ? template
                : (typeof template === 'function') ? template()
                : null;
    return t.content.cloneNode(true);
  }
}

