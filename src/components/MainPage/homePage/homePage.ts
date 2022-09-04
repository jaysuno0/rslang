import { Authorization } from '../../Authorization/Authorization';
import '../img/homePageBack.png';
import '../img/homePageBack2.png';
import '../img/homePageBack3.svg';
import '../img/homePageStats.png';
import '../img/favicon.ico';

export default class HomeScreenRender {
  template: string;

  constructor() {
    this.template = `
     <h1 class="homePage__title title">RS-Lang</h1>
     <div class="homePage__subtitle">
     <div class="subtitle__content">
       <p class="subtitle__text">Образовательная платформа для изучения и практики аглийского языка, построенная на игровой механике</p>
       <img src="./img/homePageBack.png" class="subtitle__image" alt="">
     </div>
     <div class="subtitle__content">
       <p class="subtitle__text">Нескучное онлайн-обучение на компьютере с помощью игр и интересных заданий в любое удобное для вас время</p>
       <img src="./img/homePageBack3.svg" class="subtitle__image" alt="">
     </div>
     <div class="subtitle__content">
     <p class="subtitle__text">Отказавшись от фразы «У меня нет времени», вы поймете, что у вас есть время фактически для всего, что вы хотите сделать в жизни</p>
     <img src="./img/homePageBack2.png" class="subtitle__image" alt="">
    </div>
    <div class="subtitle__content">
     <p class="subtitle__text">Контролируйте свой прогресс и анализируйте свои успехи при помощи статистики </p>
     <img src="./img/homePageStats.png" class="subtitle__image" alt="">
    </div>
   </div>
   <div class="registration">
    <div class="registration__title">
      <p class="title">Еще сомневаешься? Ригистрируйся и давай начинать!</p>
    </div>
      <a href="##" id="login" class="homePage__button">
      <div class="registration__button">
      <span>Регистрация</span>
      </div>
      </a>  
  </div>
         `;
  }

  render() {
    const screen = document.querySelector('.screen');
    const homePage = document.createElement('div');
    homePage.classList.add('homePage');
    homePage.id = ('homePage');
    homePage.innerHTML = this.template;
    screen?.append(homePage);

    const homePageBtn = document.querySelector('.registration__button') as HTMLDivElement;
    homePageBtn.addEventListener('click', () => Authorization.create());
  }

  create() {
    const screen = document.querySelector('.screen');
    if (screen) {
      screen.innerHTML = ' ';
    }
    this.render();
  }
}
