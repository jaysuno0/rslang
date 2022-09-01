import { IWord } from '../../Api/wordsApi';

interface IStore {
  words: Array<IWord>;
  order: Array<number>;
  result: Array<boolean>;
  answers: Array<string>;
  currentWord: number;
  audio: HTMLAudioElement;
}

const store: IStore = {
  words: [],
  order: [],
  result: [],
  answers: [],
  currentWord: 0,
  audio: new Audio(),
};

store.audio.addEventListener("canplaythrough", (event) => { store.audio.play(); });

export default store;
