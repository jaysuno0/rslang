import './components/MainPage/initMainPage';
import './components/Game/gameSelect/gameSelectInit.ts';
import { isUserLogged } from './components/Authorization/Authorization';
import state from './state';

(async function setState() {
  state.isUserLogged = await isUserLogged();
  setInterval(() => {
    isUserLogged(); // will refresh token
  }, state.refreshTime);
}());
