import '../img/gameSelectSprint1.png';
import '../img/gameSelectSprint2.png';
import '../img/gameSelectAudio1.svg';
import '../img/gameSelectAudio2.svg';
import setupGameSelectButtonListeners, { ButtonGameSelectActionsTypes } from './gameSelectInit';
import LevelSelect from '../GameSprint/LevelSelect/SprintLevelSelect';

const levelSelect = new LevelSelect();

export default class GameSelect {
  template: string;

  constructor() {
    this.template = `
    <div class="gameSelect__title">
    <span>Выбирай игру и давай начинать!</span>
  </div>
  <div class="games" id="games">
    <div class="game__wrapper" id="gameSprint">
      <div class="gameAfter game ">
        <div class="game__image">
          <img src="../img/gameSelectSprint2.png" alt="">
        </div>
        <div class="game__name">
          <span>«Спринт» - это тренировка для повторения заученных слов из вашего словаря</span>
        </div>
      </div>
      <div class="gameBefore game">
        <div class="game__image">
          <img src="../img/gameSelectSprint1.png" alt="">
        </div>
        <div class="game__name">
          <span>- СПРИНТ -</span>
        </div>
      </div>
    </div>
    <div class="game__wrapper" id="gameAudio">
      <div class="gameAfter game ">
        <div class="game__image">
          <img src="../img/gameSelectAudio2.svg" alt="">
        </div>
        <div class="game__name">
          <span>Тренировка Аудиовызов улучшает восприятие речи на слух</span>
        </div>
      </div>
      <div class="gameBefore game">
        <div class="game__image">
          <img src="../img/gameSelectAudio1.svg" alt="">
        </div>
        <div class="game__name">
          <span>- АУДИОВЫЗОВ -</span>
        </div>
      </div>
    </div>
  </div>
         `;
  }

  render() {
    const screen = document.querySelector('.screen');
    const gameSelected = document.createElement('div');
    gameSelected.classList.add('gameSelect');
    gameSelected.id = ('gameSelect');
    gameSelected.innerHTML = this.template;
    screen?.append(gameSelected);
  }

  create() {
    const screen = document.querySelector('.screen');
    if (screen) {
      screen.innerHTML = ' ';
    }
    this.render();
    setupGameSelectButtonListeners({
      [ButtonGameSelectActionsTypes.GameSprint]: () => levelSelect.create(),
      [ButtonGameSelectActionsTypes.GameAudio]: () => { console.log('GameAudio Callback'); },
    });
  }
}
