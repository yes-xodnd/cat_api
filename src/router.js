class Router {
  root = document.createElement('div');
  routes = [];
  pages = {};
  base = '';
  
  registerPath = (path, ...components) => {
    if (this.pages.hasOwnProperty(path)) throw new Error('중복된 url입니다.');
    this.routes.push(path);
    this.pages[path] = components;
    return this;
  }

  navigate(path) {
    if (!this._isValidPath(path)) throw new Error('등록되지 않은 path입니다.');
    history.pushState({}, '', this.base + path);
    this._renderPage(path);
  }

  _isValidPath(path) {
    return this.routes.includes(path);
  }

  _renderPage(path) {
    const fragment = document.createDocumentFragment();

    this.pages[path]?.forEach(([component, props = {}]) => {
      const child = new component({ ...props, parent: fragment });
      child.render();
    });

    this.root.innerHTML = null;
    this.root.append(fragment);
  }

  getPath() {
    const _pathname = this.isGithub
                     ? location.pathname.slice(17)
                     : location.pathname;
    
    const pathList = _pathname.split('/').filter(x => x !== '');
    const isIndex = !pathList.length || pathList.includes('index.html');

    return isIndex ? '/' : '/' + pathList[0];
  }

  init() {
    if (location.pathname.includes('js_practice_demo')) {
      this.base = '/js_practice_demo';
    }
    this.navigate(this.getPath());
  }
}


// instance
const router = new Router();
let isUsingRouter = false;


export function useRouter(app) {
  if (isUsingRouter) return;
  isUsingRouter = true;
  app.getFragment().append(router.root);
  window.addEventListener(
    'popstate',
    () => router.navigate(router.getPath())
  );

  return router;
}

export function navigate(path) {
  router.navigate(path);
};