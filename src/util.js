export class StateObserver {

  constructor(state) {
    this._state = state;
    this._subscribers = {};
  }

  /**
   * subscribe state property
   * @param {string} prop target property
   * @param {HTMLElement} node subscriber node
   * @param {function} handler on setprop event handler
   * @param {object} options eventlistener options - can't use capture
   */
  subscribe = (prop, node, handler, options = {}) => {
    if (options === true || ('capture' in options && options.capture === true)) {
      throw new Error('capture는 사용할 수 없습니다.');
    }

    if (!this._subscribers[prop]) this._subscribers[prop] = [];
    this._subscribers[prop].push(node);

    node.addEventListener('set' + prop, handler, options);
  }

  /**
   * set state property a new value and publish event to subscribers
   * @param {string} prop target property
   * @param {*} newValue new value
   */
  setState = (prop, newValue) => {
    this._state[prop] = newValue;
    this._publish(prop);
  }
  
  _publish = prop => {
    const e = new Event('set' + prop);
    this._subscribers[prop].forEach(node => {
      node.dispatchEvent(e);
    });
  }
}
