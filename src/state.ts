import { ButtonActionTypes } from './components/MainPage/setupButtonListeners';
import {
  createUserWord,
  getUserWord,
  IUserWord,
  IWordProps,
  updateUserWord,
  deleteUserWord,
} from './components/Api/userWordsApi';

interface IState {
  userId: string;
  refreshTime: number;
  accessToken: string;
  isUserLogged: boolean;
  userWords: { [key: string]: IUserWord };
  screen: ButtonActionTypes;

  setScreen: (screen: ButtonActionTypes) => void;
  addWord: (id: string, props: IWordProps) => void;
  updateWord: (id: string, props: IWordProps) => void;
  deleteWord: (id: string) => void;
}

const state: IState = {
  userId: '',
  accessToken: '',
  isUserLogged: false,
  userWords: {},
  refreshTime: 1.26e+7, // 3.5 hours
  screen: ButtonActionTypes.Home,

  setScreen(screen) {
    this.screen = screen;
    localStorage.setItem('screen', screen);
  },

  async addWord(id, props) {
    const response = await createUserWord(this.userId, this.accessToken, id, props);
    if (response.isSuccess) {
      this.userWords[id] = (await getUserWord(this.userId, this.accessToken, id)).userWord;
    }
  },

  updateWord(id, props) {
    updateUserWord(this.userId, this.accessToken, id, props);
    this.userWords[id].difficulty = props.difficulty;
    this.userWords[id].optional = props.optional;
  },

  deleteWord(id) {
    deleteUserWord(this.userId, this.accessToken, id);
  },
};

export default state;
