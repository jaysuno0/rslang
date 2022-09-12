import '../img/headerLogo.svg';
import '../img/headerLoginLogo.svg';

export default class HeaderRender {
  template: string;

  constructor() {
    this.template = `
         <div class="header" id="header">
            <div class="header__logo logo header__button" id="home">
              <a href="#" onclick="location.reload()"><img src='./img/headerLogo.svg' alt="logo"></a>
            </div>
            <div class="header__name">
              <span>- RS Lang -</span>
            </div>
            <div class="header__wrapper">
              <button id="login" class="header__login logo header__button">
                <img src="./img/headerLoginLogo.svg" alt="login icon">
              </button>
              <div class="header__nav-btn header__button">
                <div class="header__nav-btn-stick"></div>
                <div class="header__nav-btn-stick"></div>
                <div class="header__nav-btn-stick"></div>
              </div>
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
