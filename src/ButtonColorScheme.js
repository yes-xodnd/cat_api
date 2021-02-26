import Component from './Component.js';

export default class ButtonColorScheme extends Component {

  isDarkscheme = false;

  template = () => `
    <div class="button-colorscheme">
      <div class="slidebar" style="background: ${this.getBackgroundStyle()}">
        <div class="switch" style="transform: ${this.getTransformStyle()}"></div>
      </div>
    </div>
  `;

  constructor(props) {
    super(props);
    this.init();

    this.slidebar = this.selectElement('.slidebar');
    this.switch = this.selectElement('.switch');
  }

  created() {
    if (window.matchMedia('(prefered-color-scheme: dark)').matches) {
      this.isDarkscheme = true;
    };
  }

  beforeRender() {
    const container = this.selectElement('.button-colorscheme');
    container.addEventListener('click', this.toggle);
  }

  getTransformStyle() {
    return (this.isDarkscheme) ? 'translateX(16px)' : 'translateX(0px)';
  }

  getBackgroundStyle() {
    return (this.isDarkscheme) ? 'rgb(62, 92, 182)' : 'lightgrey';
  }

  toggle = e => {
    this.isDarkscheme = !this.isDarkscheme;
    this.switch.style.transform = this.getTransformStyle();
    this.slidebar.style.background = this.getBackgroundStyle();
    document.body.className = this.isDarkscheme ? 'dark' : 'default';
  }
}