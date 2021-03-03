class Router {
  root;
  routes = [];
  pages = {};
  
  registerPath = (path, ...components) => {
    if (this.pages.hasOwnProperty(path)) throw new Error('중복된 url입니다.');
    this.routes.push(path);
    this.pages[path] = components;
    return this;
  }

  navigate(path) {
    if (!this._isValidPath(path)) throw new Error('등록되지 않은 path입니다.');
    history.pushState({}, '', path);
    this._switchPage(path);
  }

  _isValidPath(path) {
    return this.routes.includes(path);
  }

  _switchPage(path) {
    this._renderPage(path);
  }

  _renderPage(path) {
    const fragment = document.createDocumentFragment();

    this.pages[path].forEach(([component, props = {}]) => {
      const child = new component({ ...props, parent: fragment });
      child.render();
    });

    this.root.innerHTML = null;
    this.root.append(fragment);
  }

  checkPath() {
    const path = '/' + location.pathname.split('/')[1];
    if (this._isValidPath) {
      this._switchPage(path)
    } else {
      // 예외처리 -> not found 구현
    }
  }

  init() {
    this.checkPath();
  }
}


// instance
const router = new Router();
let isUsingRouter = false;


export function useRouter(app) {
  if (isUsingRouter) return;
  isUsingRouter = true;
  
  const root = document.createElement('div');
  app.getFragment().append(root);
  router.root = root;

  window.addEventListener('popstate', () => router.checkPath());
  
  return router;
}

export function navigate(path) {
  router.navigate(path);
};