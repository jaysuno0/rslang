/* eslint-disable @typescript-eslint/no-unused-vars */
import { IWord } from '../../Api/wordsApi';

interface IStore {
  words: Array<IWord>;
  order: Array<number>;
  answers: Array<string>;
  currentWord: number;
  isAnswered: boolean;
  isEventsDisabled: boolean;
  appOutput: HTMLDivElement;
  audio: Array<HTMLAudioElement>;
  rightAnswerIdxs: Array<number>;
  wrongAnswerIdxs: Array<number>;
  startGame: (isStartedFromTextbook: boolean, group: number, page: number) => void;
}

const store: IStore = {
  words: [],
  order: [],
  answers: [],
  currentWord: 0,
  isAnswered: false,
  isEventsDisabled: false,
  audio: [],
  appOutput: document.createElement('div'),
  rightAnswerIdxs: [],
  wrongAnswerIdxs: [],
  startGame: (isStartedFromTextbook = false, group = 1, page = 1) => {},
};

store.appOutput.classList.add('acg__output');

export default store;
/* eslint-enable @typescript-eslint/no-unused-vars */
