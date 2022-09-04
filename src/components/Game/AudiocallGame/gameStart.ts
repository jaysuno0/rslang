import { getRandomOrder } from './utils';
import store from './gameStore';
import { showGameFrame } from './gameFrame';
import { setGameFrameHandlers } from './gameFrameEvents';
import { renderMsg } from './render';
import { getGameWords } from './gameWords';

export const startGame = async (
  isPageSetted: boolean,
  group: number,
  page: number,
) => {
  renderMsg(store.appOutput, 'Загрузка слов...');
  await getGameWords(isPageSetted, group, page);
  if (!store.words.length) {
    renderMsg(store.appOutput, 'Нет слов для игры в данном разделе');
  }
  store.order = getRandomOrder(store.words.length);
  showGameFrame();
  setGameFrameHandlers();
};

export default startGame;
