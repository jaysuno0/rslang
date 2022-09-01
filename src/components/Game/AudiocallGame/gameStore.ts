import { IWord } from '../../Api/wordsApi';

interface IStore {
  words: Array<IWord>;
  order: Array<number>;
  result: Array<boolean>;
  answers: Array<string>;
  currentWord: number;
  appOutput: HTMLDivElement;
  audio: HTMLAudioElement;
}

const store: IStore = {
  words: [],
  order: [],
  result: [],
  answers: [],
  currentWord: 0,
  audio: new Audio(),
  appOutput: document.createElement('div'),
};

store.appOutput.classList.add('acg__output');
store.audio.addEventListener('canplaythrough', () => { store.audio.play(); });

export default store;
