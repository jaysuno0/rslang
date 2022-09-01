import { IWord } from '../../Api/wordsApi';

interface IStore {
  words: Array<IWord>;
  order: Array<number>;
  result: Array<boolean>;
  answers: Array<string>;
  currentWord: number;
}

const store: IStore = {
  words: [],
  order: [],
  result: [],
  answers: [],
  currentWord: 0,
};

export default store;
