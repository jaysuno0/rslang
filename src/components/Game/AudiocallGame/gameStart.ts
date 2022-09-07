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
  store.words = [];
  store.audio = [];
  store.rightAnswerIdxs = [];
  store.wrongAnswerIdxs = [];
  store.currentWord = 0;
  store.stat.right = 0;
  store.stat.wrong = 0;
  store.stat.newWords = 0;
  store.stat.learnedWords = 0;
  store.rightAnswersRange = 0;

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
