import '../img/navBook.svg';
import '../img/navGame.svg';
import '../img/navHome.svg';
import '../img/navStats.svg';
import '../img/navTeam.svg';

export default class NavRender {
  template: string;

  constructor() {
    this.template = `
      <div class="nav" id="nav">
         <ul class="nav__list">
            <a href="##">
               <div class="nav__item" id="home">
                  <div class="item__logo">
                     <img src="./img/navHome.svg" alt="homeLogo">
                  </div>
                  <div class="item__name">
                     <span>Главная</span>
                  </div>
               </div>
            </a>
            <a href="##">
               <div class="nav__item" id="book">
                  <div class="item__logo">
                     <img src="./img/navBook.svg" alt="bookLogo">
                  </div>
                  <div class="item__name">
                     <span>Учебник</span>
                  </div>
               </div>
            </a>
            <a href="##">
               <div class="nav__item" id="game">
                  <div class="item__logo">
                     <img src="./img/navGame.svg" alt="gameLogo">
                  </div>
                  <div class="item__name">
                     <span>Игры</span>
                  </div>
               </div>
            </a>
            <a href="##">
               <div class="nav__item" id="stats">
                  <div class="item__logo">
                     <img src="./img/navStats.svg" alt="statsLogo">
                  </div>
                  <div class="item__name">
                     <span>Статистика</span>
                  </div>
               </div>
            </a>
            <a href="##">
               <div class="nav__item" id="team">
                  <div class="item__logo">
                     <img src="./img/navTeam.svg" alt="teamLogo">
                  </div>
                  <div class="item__name">
                     <span>О команде</span>
                  </div>
               </div>
            </a>
         </ul>
      </div>
        `;
  }

  render() {
    const { body } = document;
    const main = document.createElement('main');
    main.classList.add('main');
    body.append(main);
    const nav = document.createElement('nav');
    nav.innerHTML = this.template;
    main.prepend(nav);
  }
}
