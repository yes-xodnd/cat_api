export default class Component {
  /**
   * register every property in props object
   * @param {object} props
   */
  constructor(props) {
    if (props.constructor !== Object) {
      throw new Error('props는 객체여야 합니다.');

    } else if (!('parent' in props)) {
      throw new Error('props는 parent 프로퍼티를 가져야합니다.');

    } else if (!(props.parent instanceof HTMLElement)) {
      throw new Error('parent 프로퍼티 값은 HTMLElement여야 합니다.');

    }

    Object.keys(props).forEach(item => this[item] = props[item]);
  }

  /**
   * call created() method & create DocumentFragment with template
   */
  init() {
    if (this.created) this.created();
    this._fragment = this._createTemplateFragment(this.template);
  }
  
  
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

