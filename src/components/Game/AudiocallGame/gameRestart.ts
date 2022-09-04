import store from './gameStore';

const gameRestart = () => {
  store.audio = [];
  store.rightAnswerIdxs = [];
  store.wrongAnswerIdxs = [];
  store.currentWord = 0;
  store.startGame(false, 1, 1);
};

export default gameRestart;
