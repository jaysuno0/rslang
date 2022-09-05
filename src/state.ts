/* eslint-disable import/no-cycle */
import { ButtonActionTypes } from './components/MainPage/setupButtonListeners';

interface IState {
  userId: string;
  refreshTime: number;
  accessToken: string;
  isUserLogged: boolean;
  screen: ButtonActionTypes;

  setScreen: (screen: ButtonActionTypes) => void;
}

const state: IState = {
  userId: '',
  accessToken: '',
  isUserLogged: false,
  refreshTime: 1.26e+7, // 3.5 hours
  screen: ButtonActionTypes.Home,

  setScreen(screen) {
    this.screen = screen;
    localStorage.setItem('screen', screen);
  },
};

export default state;
