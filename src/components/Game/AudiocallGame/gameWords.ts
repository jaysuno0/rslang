import { getWords } from '../../Api/wordsApi';
import store from './gameStore';
import { renderWordsLoading, renderErrMsg } from './render';
import { getRandomNumber } from './utils';

const PAGES = 29;

export const getGameWords = async (
  isPageSetted: boolean,
  group: number,
  page: number,
) => {
  renderWordsLoading(store.appOutput);

  const settedPage = isPageSetted ? page - 1 : getRandomNumber(PAGES);
  const wordsResp = await getWords(group - 1, settedPage);

  if (!wordsResp.isSuccess) {
    renderErrMsg(store.appOutput, wordsResp.errMsg);
    return;
  }

  store.words = wordsResp.words;
};

export default getGameWords;
