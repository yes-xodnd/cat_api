import Component from './Component.js';

export default class ButtonColorScheme extends Component {

  isDarkscheme = false;

  template = () => `
    <div class="button-colorscheme">
      <div class="slidebar">
        <div class="switch" style="transform: ${this.getTransformAttr()}"></div>
      </div>
    </div>
  `;

  constructor(props) {
    super(props);
    this.init();

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

  getTransformAttr() {
    return (this.isDarkscheme) ? 'translateX(16px)' : 'translateX(0px)';
  }

  toggle = e => {
    this.isDarkscheme = !this.isDarkscheme;
    this.switch.style.transform = this.getTransformAttr();
  }
}