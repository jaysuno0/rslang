import { getWords, IWordsResp } from '../../Api/wordsApi';
import { getUserAggregatedWords, IWordsParams, GET_HARD } from '../../Api/userAggregatedWords';
import store from './gameStore';
import { renderWordsLoading, renderErrMsg } from './render';
import { getRandomNumber } from './utils';
import state from '../../../state';

const PAGES = 29;
const WORDS_PER_PAGE = 20;
const HARD_GROUP = 7;

export const getGameWords = async (
  isPageSetted: boolean,
  group: number,
  page: number,
) => {
  renderWordsLoading(store.appOutput);

  let settedPage = isPageSetted ? page : getRandomNumber(PAGES) + 1;

  if(!state.isUserLogged) {
    const wordsResp = await getWords(group - 1, settedPage);

    if (!wordsResp.isSuccess) {
      renderErrMsg(store.appOutput, wordsResp.errMsg);
      return;
    }

    store.words = wordsResp.words;
    return;
  }

  const params: IWordsParams = {
    page: settedPage,
    wordsPerPage: WORDS_PER_PAGE,
  }

  if (group === HARD_GROUP) {
    params.filter = GET_HARD;
  }
  else {
    params.group = group - 1;
  }

  do {
    settedPage -= 1;
    params.page = settedPage;
    const wordsResp = await getUserAggregatedWords(
      state.userId,
      state.accessToken,
      params,
    );

    if (!wordsResp.isSuccess) {
      renderErrMsg(store.appOutput, wordsResp.errMsg);
      return;
    }

    if(isPageSetted) {
      wordsResp.words = wordsResp.words.filter((word) =>
        (!word.userWord) || (!word.userWord.optional) || (!word.userWord.optional.isLearned)
      );
    }
    store.words = store.words.concat(wordsResp.words);
  }
  while ((settedPage > 0) && (store.words.length < WORDS_PER_PAGE));

  if (store.words.length > WORDS_PER_PAGE) {
    store.words = store.words.slice(0, WORDS_PER_PAGE);
  }
};

export default getGameWords;
