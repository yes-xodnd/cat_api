export function useStateObserver(state) {
  const observer = new StateObserver(state);
  state.$observe = observer.observe;
  state.$set = observer.set;
};

export class StateObserver {

  constructor(state) {
    this.state = state;
    this.observer = {};
  }

  observe = (prop, node, handler) => {
    if (!this.observer[prop]) this.observer[prop] = [];
    this.observer[prop].push(node);
    node.addEventListener('set' + prop, handler);
  }

  set = (prop, newValue) => {
    this.state[prop] = newValue;
    this._emit(prop);
  }
  
  _emit = prop => {
    this.observer[prop].forEach(node => {
      node.dispatchEvent(new Event('set' + prop));
    });
  }
}
