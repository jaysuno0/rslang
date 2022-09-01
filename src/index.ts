import { ButtonActionTypes } from './components/MainPage/setupButtonListeners';
import { isUserLogged } from './components/Authorization/Authorization';
import { getUserWords } from './components/Api/userWordsApi';
import state from './state';
import setScreen from './components/MainPage/initMainPage';

(async function setState() {
  state.isUserLogged = await isUserLogged();
  setInterval(() => {
    isUserLogged(); // will refresh token
  }, state.refreshTime);

  if (state.isUserLogged) {
    (await getUserWords(state.userId, state.accessToken)).userWords.forEach((word) => {
      state.userWords[word.wordId] = word;
    });
  }

  const screen = localStorage.getItem('screen') as ButtonActionTypes;
  setScreen(screen);
}());
