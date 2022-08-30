import '../../img/gameSprintPointRight.png';
import './GameScreen/gameScreen.css';

export default class gameScreen {
   template: string;
 
   constructor() {
     this.template = `
     <div class="main__timer">00:59</div>
     <div class="sprint__score">
     <div class="score__tittle">Баллов за раунд:</div>
     <div class="score__point">0</div>
   </div>
   <div class="screen__card">
     <div class="card__header">
       <div class="header__point">
         <img src="../img/gameSprintPointRight.png" alt="">
         <img src="../img/gameSprintPointRight.png" alt="">
         <img src="../img/gameSprintPointRight.png" alt="">
       </div>
       <div class="header__bonus">
         <div class="bonus__title">Бонус за слово +</div>
         <div class="bonus__score">10</div>
       </div>
     </div>
     <div class="card__main">
       <div class="main__word">butterfly</div>
       <div class="main__translate">бабочка</div>
     </div>
     <div class="card__footer">
       <button class="false sprint__button">Неверно</button>
       <button class="true sprint__button">Верно</button>
     </div>
   </div>
          `;
   }
 
   render() {
     const screen = document.querySelector('.screen');
     const gameScreen = document.createElement('div');
     gameScreen.classList.add('gameScreen');
     gameScreen.id = ('gameScreen');
     gameScreen.innerHTML = this.template;
     screen?.append(gameScreen);
   }
 
   create() {
    const screen = document.querySelector('.screen');
    if (screen) {
       screen.innerHTML = ' ';
    }
    this.render();
   }
 }
 