import check from "./sprintSelectInit";
import './sprintLevelSelect.css';

export default class LevelSelect {
   template: string;
 
   constructor() {
     this.template = `
     <div class="game__name">
     <span>- СПРИНТ -</span>
   </div>
   <div class="game__instruction">
    <ul class="instruction__list">
      <li>- У тебя есть одна минута. Отгадай как можно больше слов и старайся не совершать ошибки.</li>
      <li>- Для управления используй мышь или же клавиши влево и вправо на своей клавиатуре.</li>
      <li>- Выбирай уровень сложности и СТАРТУЕМ...</li>
    </ul>
   </div>
   <div class="game__form">
     <form action="#" name="sprintSelectLevel" class="game__form">
       <div class="selectLevel__item">
         <label for="select_1" class="selectLevel__label">Сложность</label>
         <select name="sprintLevel" id="select_1" class="select__item form__button">
           <option value="1">1</option>
           <option value="2" selected>2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
         </select>
       </div>
       <button type="submit" class="start-button form__button">Let's go</button>
     </form>
   </div>
          `;
   }
 
   render() {
     const screen = document.querySelector('.screen');
     const levelSelect = document.createElement('div');
     levelSelect.classList.add('levelSelect');
     levelSelect.id = ('levelSelect');
     levelSelect.innerHTML = this.template;
     screen?.append(levelSelect);
   }
 
   create() {
    const screen = document.querySelector('.screen');
    if (screen) {
       screen.innerHTML = ' ';
    }
    this.render();
    check();
   }
 }
 

 