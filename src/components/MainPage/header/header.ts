import '../img/headerLogo.svg';
import '../img/headerLoginLogo.svg';

export default class HeaderRender {
  template: string;

  constructor() {
    this.template = `
         <div class="header">
          <div class="header__logo logo" id="logo">
            <a href="##"><img src='./img/headerLogo.svg' alt="logo"></a>
          </div>
          <div class="header__name">
            <span>- RS Lang -</span>
          </div>
          <div class="header__login logo" id="login">
            <a href="##"><img src="./img/headerLoginLogo.svg" alt="login Logo"></a>
          </div>
         </div>
        `;
  }

  render() {
    const { body } = document;
    const header = document.createElement('header');
    header.innerHTML = this.template;
    body.prepend(header);
  }
}
