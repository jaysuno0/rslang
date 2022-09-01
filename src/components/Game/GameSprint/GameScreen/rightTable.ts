import { IWord } from '../../../Api/wordsApi';

const renderRightTable = (right: IWord[], i: number) => `
    <button class="word__sound" id="${right[i].id}">
      <img src="../img/sound.svg" alt="sound">
    </button>
    <span class="word__name">${right[i].word}</span>
    <span class="word__translate">${right[i].translateToCompare}</span>
`;
export default renderRightTable;
