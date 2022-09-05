import { IWord } from '../../../Api/wordsApi';

const renderWrongTable = (wrong: IWord[], i: number) => `
      <button class="word__sound" id="${wrong[i].id}">
         <img src="./img/sound.svg" alt="sound">
      </button>
      <span class="word__name">${wrong[i].word}</span>
      <span class="word__translate">${wrong[i].translateToCompare}</span>
   `;
export default renderWrongTable;
