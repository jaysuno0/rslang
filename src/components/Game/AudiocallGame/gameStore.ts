/* eslint-disable @typescript-eslint/no-unused-vars */
import { IWord } from '../../Api/wordsApi';
import { IGameData } from '../../Statistics/Statistics';

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
  soundRight: HTMLAudioElement;
  soundWrong: HTMLAudioElement;
  stat: IGameData;
  rightAnswersRange: number;
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
  soundRight: new Audio(),
  soundWrong: new Audio(),
  stat: {
    right: 0,
    wrong: 0,
    newWords: 0,
    learnedWords: 0,
    rightAnswersRange: 0,
  },
  rightAnswersRange: 0,
};

store.soundRight.src = 'https://song.nazvonok.ru/song/e9dc/gomer-simpson-woohoo.mp3?id=21179';
store.soundWrong.src = 'https://song.nazvonok.ru/song/9ff2/ugu-filina-korotkoe-uhane-filina.mp3?id=26318';
store.appOutput.classList.add('acg__output');

export default store;
/* eslint-enable @typescript-eslint/no-unused-vars */
