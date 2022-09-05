import { ButtonActionTypes } from './components/MainPage/setupButtonListeners';
import { isUserLogged } from './components/Authorization/Authorization';
import state from './state';
import setScreen from './components/MainPage/initMainPage';
import './components/Game/GameSprint/initGameSprint';

(async function setState() {
  state.isUserLogged = await isUserLogged();
  setInterval(() => {
    isUserLogged(); // will refresh token
  }, state.refreshTime);

  const screen = localStorage.getItem('screen') as ButtonActionTypes;
  setScreen(screen);
}());
