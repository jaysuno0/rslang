import '../../img/gameSprintPointRight.png';

export default class GameScreen {
  template: string;

  constructor() {
    this.template = `
     <div class="sprint__timer" id="timer">60</div>
     <div class="timer__animation"></div>
     <div class="sprint__score">
     <div class="score__title">Баллов за раунд:</div>
     <div class="score__point" id="score__point">0</div>
   </div>
   <div class="screen__card" id="screen__card">
     <div class="card__top">
       <div class="header__point" id="iconContainer">
       </div>
       <div class="header__bonus">
         <div class="bonus__title">Бонус за слово +</div>
         <div class="bonus__score" id="bonusScore">10</div>
       </div>
     </div>
     <div class="card__main">
       <div class="main__word" id="cardWord"></div>
       <div class="main__translate" id="cardTranslate"></div>
     </div>
     <div class="card__bottom">
       <button class="false sprint__button" id="no">Неверно</button>
       <button class="true sprint__button" id="yes">Верно</button>
     </div>
   </div>
          `;
  }

  render() {
    const screen = document.querySelector('.screen');
    const gameScreenContainer = document.createElement('div');
    gameScreenContainer.classList.add('gameScreen');
    gameScreenContainer.id = ('gameScreen');
    gameScreenContainer.innerHTML = this.template;
    screen?.append(gameScreenContainer);
  }

  create() {
    const screen = document.querySelector('.screen');
    if (screen) {
      screen.innerHTML = ' ';
    }
    this.render();
  }
}
