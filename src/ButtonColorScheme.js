import Component from './Component.js';

export default class ButtonColorScheme extends Component {

  isDarkScheme = false;

  template = () => {
    const active = this.isDarkScheme ? 'active' : '';
    return `
      <div class="button-colorscheme">
        <div class="slidebar ${active}">
          <div class="switch ${active}"></div>
        </div>
      </div>
    `;
  };

  constructor(props) {
    super(props);
    this.init();

    this.slidebar = this.selectElement('.slidebar');
    this.switch = this.selectElement('.switch');
  }

  created() {
    if (
      window.matchMedia('(prefered-color-scheme: dark)').matches ||
      localStorage.getItem('colorscheme') === 'dark'
      ) {
      this.isDarkScheme = true;
      document.body.className = 'dark';
    };
  }

  beforeRender() {
    this.addListener('.button-colorscheme', 'click', this.toggle);
  }

  toggle = e => {
    this.isDarkScheme = !this.isDarkScheme;
    this.switch.classList.toggle('active');
    this.slidebar.classList.toggle('active');
    
    if (this.isDarkScheme) {
      document.body.className = 'dark';
      localStorage.setItem('colorscheme', 'dark');
    } else {
      document.body.className = 'default';
      localStorage.setItem('colorscheme', 'default');
    }
  }
}