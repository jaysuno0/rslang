import store from './gameStore';

const gameRestart = () => {
  store.startGame(false, 1, 1);
};

export default gameRestart;
