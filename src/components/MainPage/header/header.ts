export default class HeaderRender {
  template: string;

  constructor() {
    this.template = `
         <div class="header">
         <div class="header__logo logo">
            <a href="##"><img src="../img/mainPageLogo.svg" alt="logo"></a>
         </div>
         <div class="header__login logo">
            <img src="../img/loginLogo.svg" alt="loginLogo">
         </div>
         </div>
        `;
  }

  render() {
    const { body } = document;
    const nav = document.createElement('nav');
    nav.innerHTML = this.template;
    body.prepend();
  }
}
