import { getRandomOrder } from './utils';
import store from './gameStore';
import { showGameFrame } from './gameFrame';
import { setGameFrameHandlers } from './gameFrameEvents';
import { getGameWords } from './gameWords';

export const startGame = async (
  isPageSetted: boolean,
  group: number,
  page: number,
) => {
  await getGameWords(isPageSetted, group, page);
  store.order = getRandomOrder(store.words.length);
  showGameFrame();
  setGameFrameHandlers();
};

export default startGame;
