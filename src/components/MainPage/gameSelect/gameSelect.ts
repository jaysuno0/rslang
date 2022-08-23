import '../img/homePageBack.png';
import '../img/homePageBack2.png';

export default class gameSelect {
  template: string;

  constructor() {
    this.template = `
      <div class="gameSelect__title">
        <span>Выбирай игру и давай начинать!</span>
      </div>
      <div class="games">
        <div class="game">
          <div class="game__name">
            <span>СПРИНТ</span>
          </div>
        </div>
        <div class="game">
          <div class="game__name">
            <span>АУДИОВЫЗОВ</span>
          </div>
        </div>
      </div>
         `;
  }

  render() {
    const screen = document.querySelector('.screen');
    const gameSelect = document.createElement('div');
    gameSelect.classList.add('gameSelect');
    gameSelect.id = ('gameSelect');
    gameSelect.innerHTML = this.template;
    screen?.append(gameSelect);
  }

  create() {
   const screen = document.querySelector('.screen');
   if (screen) {
      screen.innerHTML = ' ';
   }
   this.render();
  }
}
