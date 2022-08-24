import './authorization.css';

interface IAuthorization {
  template: string;
  templateForm: string;
  render: () => void;
  renderForm: (titleText: string) => void;
}

const Authorization: IAuthorization = {
  template: `
    <p class="authorization__title">Добро пожаловать :)</p>
    <div class="authorization__btn-wrapper">
      <button class="authorization__btn authorization__btn_login">Вход</button>
      <button class="authorization__btn authorization__btn_signup">Регистрация</button>
    </div>`,

  templateForm:
    `<form class="authorization__form" action="" method="POST">
      <p class="authorization__title"></p>
      <div class="authorization__input-wrapper authorization__input-wrapper_nick">
        <label for="name" class="authorization__label">Никнейм</label>
        <input id="name" class="authorization__input" type="text">
      </div>
      <div class="authorization__input-wrapper">
        <label for="email" class="authorization__label">Почта</label>
        <input id="email" class="authorization__input" type="email">
      </div>
      <div class="authorization__input-wrapper">
        <label for="password" class="authorization__label">Пароль</label>
        <input id="password" class="authorization__input" type="password">
      </div>
      <button class="authorization__btn btn" type="submit">войти</button>
    </form>`,

  render() {
    const authWrapper = document.createElement('div');
    const screen = document.querySelector('.screen') as HTMLDivElement;
    screen.innerHTML = '';
    authWrapper.classList.add('authorization');
    authWrapper.innerHTML = this.template;
    screen.append(authWrapper);

    const loginBtn = authWrapper.querySelector('.authorization__btn_login') as HTMLButtonElement;
    const signUp = authWrapper.querySelector('.authorization__btn_signup') as HTMLButtonElement;
    loginBtn.addEventListener('click', () => this.renderForm('Вход'));
    signUp.addEventListener('click', () => this.renderForm('Регистрация'));
  },

  renderForm(titleText) {
    const authWrapper = document.querySelector('.authorization') as HTMLDivElement;
    authWrapper.innerHTML = this.templateForm;

    const title = authWrapper.querySelector('.authorization__title') as HTMLParagraphElement;
    title.textContent = titleText;

    if (titleText === 'Вход') {
      const nickname = authWrapper.querySelector('.authorization__input-wrapper_nick') as HTMLDivElement;
      nickname.remove();
    }

    (authWrapper.querySelector('#name') as HTMLInputElement).focus();
  },
};

export default Authorization;
