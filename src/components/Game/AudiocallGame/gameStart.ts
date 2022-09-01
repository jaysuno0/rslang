import { getWords } from '../../Api/wordsApi';
import { getRandomNumber, getRandomOrder } from './utils';
import { renderWordsLoading } from './render';
import store from './gameStore';
import showGameFrame from './gameFrame';

const PAGES = 29;

export const startGame = async (
  isPageSetted: boolean,
  group: number,
  page: number,
) => {
  renderWordsLoading();

  const settedPage = isPageSetted ? page - 1 : getRandomNumber(PAGES);
  const wordsResp = await getWords(group - 1, settedPage);

  if (!wordsResp.isSuccess) {
    alert(wordsResp.errMsg);
    return;
  }

  store.words = wordsResp.words;
  store.order = getRandomOrder(wordsResp.words.length);
  showGameFrame();
  // setGameFrameHandlers();
};
