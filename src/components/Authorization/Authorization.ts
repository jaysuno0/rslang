import './authorization.css';

enum AuthorizationTypes {
  login = 'Вход',
  signup = 'Регистрация',
}

enum ValidationLengths {
  nameMin = 3,
  nameMax = 16,
  passwordMin = 6,
  passwordMax = 35,
}

interface IAuthorization {
  currentType: AuthorizationTypes;
  template: string;
  templateForm: string;

  render: () => void;
  renderForm: (type: AuthorizationTypes) => void;
  enter: () => void;
  validate: () => boolean;
  validateName: () => boolean;
  validateEmail: () => boolean;
  validatePassword: () => boolean;
  setMessage: (text: string) => void;
}

const Authorization: IAuthorization = {
  currentType: AuthorizationTypes.login,

  template: `
    <p class="authorization__title">Добро пожаловать :)</p>
    <div class="authorization__btn-wrapper">
      <button class="authorization__btn authorization__btn_login">Вход</button>
      <button class="authorization__btn authorization__btn_signup">Регистрация</button>
    </div>`,

  templateForm:
    `<div class="authorization__form">
      <p class="authorization__title"></p>
      <p class="authorization__message"></p> 
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
      <button class="authorization__btn authorization__btn_enter btn">войти</button>
    </div>`,

  render() {
    const authWrapper = document.createElement('div');
    const screen = document.querySelector('.screen') as HTMLDivElement;
    screen.innerHTML = '';
    authWrapper.classList.add('authorization');
    authWrapper.innerHTML = this.template;
    screen.append(authWrapper);

    const loginBtn = authWrapper.querySelector('.authorization__btn_login') as HTMLButtonElement;
    const signUp = authWrapper.querySelector('.authorization__btn_signup') as HTMLButtonElement;
    loginBtn.addEventListener('click', () => this.renderForm(AuthorizationTypes.login));
    signUp.addEventListener('click', () => this.renderForm(AuthorizationTypes.signup));
  },

  renderForm(type) {
    this.currentType = type;

    const authWrapper = document.querySelector('.authorization') as HTMLDivElement;
    authWrapper.innerHTML = this.templateForm;

    const title = authWrapper.querySelector('.authorization__title') as HTMLParagraphElement;
    title.textContent = type;

    if (this.currentType === AuthorizationTypes.login) {
      const nickname = authWrapper.querySelector('.authorization__input-wrapper_nick') as HTMLDivElement;
      nickname.remove();
      (authWrapper.querySelector('#email') as HTMLInputElement).focus();
    } else {
      (authWrapper.querySelector('#name') as HTMLInputElement).focus();
    }

    const enterBtn = authWrapper.querySelector('.authorization__btn_enter') as HTMLButtonElement;
    enterBtn.addEventListener('click', () => {
      if (this.validate()) this.enter();
    });
  },

  validate() {
    let result = false;

    if (this.validateName()) {
      if (this.validateEmail()) {
        if (this.validatePassword()) result = true;
      }
    }

    return result;
  },

  validateName() {
    const name = document.querySelector('#name');
    let result = true;

    if (name) {
      const { value } = (name as HTMLInputElement);

      if (value.includes(' ')) {
        result = false;
        this.setMessage('данные не должны содержать пробелов');
      } else if (value.length < ValidationLengths.nameMin) {
        result = false;
        this.setMessage('слишком короткое имя');
      } else if (value.length > ValidationLengths.nameMax) {
        result = false;
        this.setMessage('слишком длинное имя');
      }
    }

    return result;
  },

  validateEmail() {
    const email = document.querySelector('#email') as HTMLInputElement;
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // eslint-disable-line no-useless-escape
    let result = true;

    if (email.value.includes(' ')) {
      result = false;
      this.setMessage('данные не должны содержать пробелов');
    } if (!email.value.match(emailRegExp)) {
      this.setMessage('невалидный email');
      result = false;
    }

    return result;
  },

  validatePassword() {
    const password = document.querySelector('#password') as HTMLInputElement;
    let result = true;

    if (password.value.includes(' ')) {
      result = false;
      this.setMessage('данные не должны содержать пробелов');
    } else if (password.value.length < ValidationLengths.passwordMin) {
      result = false;
      this.setMessage('слишком лёгкий пароль');
    } else if (password.value.length > ValidationLengths.passwordMax) {
      result = false;
      this.setMessage('слишком длинный пароль');
    }

    return result;
  },

  enter() {
    if (this.currentType === AuthorizationTypes.login) {
      console.log('log in');
    } else {
      console.log('sign up');
    }
  },

  setMessage(text) {
    const messageElement = document.querySelector('.authorization__message') as HTMLParagraphElement;
    const messageTime = 3000;

    messageElement.textContent = text;
    setTimeout(() => {
      messageElement.textContent = ' ';
    }, messageTime);
  },
};

export default Authorization;
