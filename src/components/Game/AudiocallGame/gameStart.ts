import { getWords } from '../../Api/wordsApi';
import { getRandomNumber, getRandomOrder } from './utils';
import { renderWordsLoading, renderErrMsg } from './render';
import store from './gameStore';
import showGameFrame from './gameFrame';
import { appOutput } from './audiocallGame';

const PAGES = 29;

export const startGame = async (
  isPageSetted: boolean,
  group: number,
  page: number,
) => {
  renderWordsLoading(appOutput);

  const settedPage = isPageSetted ? page - 1 : getRandomNumber(PAGES);
  const wordsResp = await getWords(group - 1, settedPage);

  if (!wordsResp.isSuccess) {
    renderErrMsg(appOutput, wordsResp.errMsg);
    return;
  }

  store.words = wordsResp.words;
  store.order = getRandomOrder(wordsResp.words.length);
  showGameFrame();
  // setGameFrameHandlers();
};
