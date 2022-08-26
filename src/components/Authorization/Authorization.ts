import './authorization.css';
import { loginUser } from '../Api/loginApi';
import {
  IUserLogin,
  ITokenResp,
  createUser,
  getNewToken,
} from '../Api/userApi';

enum AuthorizationTypes {
  loginType = 'Вход',
  loginBtnText = 'войти',
  signupType = 'Регистрация',
  signupBtnText = 'зарегистрироваться',
}

enum ValidationLengths {
  nameMin = 3,
  nameMax = 16,
  passwordMin = 8,
  passwordMax = 35,
}

interface IAuthorization {
  currentType: AuthorizationTypes;
  template: string;
  templateForm: string;

  create: () => void;
  createForm: (type: AuthorizationTypes, btnText: AuthorizationTypes) => void;
  enter: () => void;
  validate: () => boolean;
  validateName: () => boolean;
  validateEmail: () => boolean;
  validatePassword: () => boolean;
  setFormMessage: (text: string) => void;
  setEnterMessage: () => void;
}

const Authorization: IAuthorization = {
  currentType: AuthorizationTypes.loginType,
  template: `
    <div class="authorization__wrapper">
      <p class="authorization__title">Добро пожаловать :)</p>
      <div class="authorization__btn-wrapper">
        <button class="authorization__btn authorization__btn_login">Вход</button>
        <button class="authorization__btn authorization__btn_signup">Регистрация</button>
      </div>
    </div>`,
  templateForm:
    `<div class="authorization__wrapper">
      <form class="authorization__form">
        <p class="authorization__title"></p>
        <p class="authorization__msg"></p> 
        <div class="authorization__input-wrapper authorization__input-wrapper_nick">
          <label for="name" class="authorization__label">Никнейм</label>
          <input id="name" class="authorization__input" autocomplete="on" type="text">
        </div>
        <div class="authorization__input-wrapper">
          <label for="email" class="authorization__label">Почта</label>
          <input id="email" class="authorization__input" type="email" autocomplete="on">
        </div>
        <div class="authorization__input-wrapper">
          <label for="password" class="authorization__label">Пароль</label>
          <input id="password" class="authorization__input" type="password" autocomplete="on">
        </div>
        <button class="authorization__btn authorization__btn_enter btn"></button>
      </form>
    </div>`,

  create() {
    const authorization = document.createElement('div');
    const screen = document.querySelector('.screen') as HTMLDivElement;

    authorization.classList.add('authorization');
    authorization.innerHTML = this.template;
    screen.innerHTML = '';
    screen.append(authorization);

    const loginBtn = authorization.querySelector('.authorization__btn_login') as HTMLButtonElement;
    const signUp = authorization.querySelector('.authorization__btn_signup') as HTMLButtonElement;
    loginBtn.addEventListener('click', () => this.createForm(AuthorizationTypes.loginType, AuthorizationTypes.loginBtnText));
    signUp.addEventListener('click', () => this.createForm(AuthorizationTypes.signupType, AuthorizationTypes.signupBtnText));
  },

  createForm(type, btnText) {
    this.currentType = type;

    const authWrapper = document.querySelector('.authorization') as HTMLDivElement;
    authWrapper.innerHTML = this.templateForm;

    const title = authWrapper.querySelector('.authorization__title') as HTMLParagraphElement;
    title.textContent = type;

    if (this.currentType === AuthorizationTypes.loginType) {
      const nickname = authWrapper.querySelector('.authorization__input-wrapper_nick') as HTMLDivElement;
      nickname.remove();
      (authWrapper.querySelector('#email') as HTMLInputElement).focus();
    } else {
      (authWrapper.querySelector('#name') as HTMLInputElement).focus();
    }

    const enterBtn = authWrapper.querySelector('.authorization__btn_enter') as HTMLButtonElement;
    enterBtn.textContent = btnText;
    enterBtn.addEventListener('click', () => {
      this.setFormMessage('');
      if (this.currentType === AuthorizationTypes.signupType && this.validate()) this.enter();
      else if (this.validateEmail()) this.enter();
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
        this.setFormMessage('данные не должны содержать пробелов');
      } else if (value.length < ValidationLengths.nameMin) {
        result = false;
        this.setFormMessage('слишком короткое имя');
      } else if (value.length > ValidationLengths.nameMax) {
        result = false;
        this.setFormMessage('слишком длинное имя');
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
      this.setFormMessage('данные не должны содержать пробелов');
    } if (!email.value.match(emailRegExp)) {
      this.setFormMessage('невалидный email');
      result = false;
    }

    return result;
  },

  validatePassword() {
    const password = document.querySelector('#password') as HTMLInputElement;
    let result = true;

    if (password.value.includes(' ')) {
      result = false;
      this.setFormMessage('данные не должны содержать пробелов');
    } else if (password.value.length < ValidationLengths.passwordMin) {
      result = false;
      this.setFormMessage('слишком лёгкий пароль');
    } else if (password.value.length > ValidationLengths.passwordMax) {
      result = false;
      this.setFormMessage('слишком длинный пароль');
    }

    return result;
  },

  enter() {
    const email = (document.querySelector('#email') as HTMLInputElement).value;
    const password = (document.querySelector('#password') as HTMLInputElement).value;
    const user: IUserLogin = {
      email,
      password,
    };

    const newToken = async (tokenResp: ITokenResp, name: string) => {
      const token = await getNewToken(tokenResp.userId, tokenResp.refreshToken);
      if (!token.isSuccess) this.setFormMessage(token.errMsg);
      else {
        localStorage.setItem('id', tokenResp.userId);
        localStorage.setItem('name', tokenResp.name as string);
        localStorage.setItem('token', token.tokenResp.token);
        if (name) localStorage.setItem('name', name);
      }
    };

    const login = async () => {
      const loginResponse = await loginUser(user);
      if (loginResponse.isSuccess) {
        newToken(loginResponse.tokenResp, user.name as string);
        this.setEnterMessage();
      } else this.setFormMessage(loginResponse.errMsg);
    };

    const newUser = async () => {
      const userResponse = await createUser(user);
      if (userResponse.isSuccess) login();
      else this.setFormMessage(userResponse.errMsg);
    };

    if (this.currentType === AuthorizationTypes.signupType) {
      const nick = document.querySelector('#name') as HTMLInputElement;
      user.name = nick.value;
      newUser();
    } else login();
  },

  setFormMessage(text) {
    const messageElement = document.querySelector('.authorization__msg') as HTMLParagraphElement;
    messageElement.textContent = text;
  },

  setEnterMessage() {
    const message = document.createElement('p');
    const screen = document.querySelector('.screen') as HTMLDivElement;

    message.classList.add('authorization__enter-msg');
    message.innerHTML = 'Вы успешно вошли! <br> Приятного обучения :)';
    screen.innerHTML = '';
    screen.append(message);
  },
};

export default Authorization;
