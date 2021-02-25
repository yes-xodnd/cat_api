export function useStateObserver(state) {
  const observer = new StateObserver(state);
  state.$observe = observer.observe;
  state.$set = observer.set;
};

export class StateObserver {

  constructor(state) {
    this.state = state;
    this.observers = {};
  }

  observe = (prop, node, handler) => {
    if (!this.observers[prop]) this.observers[prop] = [];
    this.observers[prop].push(node);
    node.addEventListener('set' + prop, handler);
  }

  set = (prop, newValue) => {
    this.state[prop] = newValue;
    this._publish(prop);
  }
  
  _publish = prop => {
    this.observers[prop].forEach(node => {
      node.dispatchEvent(new Event('set' + prop));
    });
  }
}
