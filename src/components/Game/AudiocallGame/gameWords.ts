import { getWords } from '../../Api/wordsApi';
import { getUserAggregatedWords, IWordsParams, GET_HARD } from '../../Api/userAggregatedWords';
import store from './gameStore';
import { renderErrMsg } from './render';
import { getRandomNumber } from './utils';
import state from '../../../state';
import { createUserWord, updateUserWord, IWordProps } from '../../Api/userWordsApi';

const PAGES = 29;
const WORDS_PER_PAGE = 20;
const HARD_GROUP = 7;
const ANSWERS_FOR_SET_LEARNED = 3;

export const getGameWords = async (
  isPageSetted: boolean,
  group: number,
  page: number,
) => {
  let settedPage = isPageSetted ? page : getRandomNumber(PAGES) + 1;

  if (!state.isUserLogged) {
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
  };

  if (group === HARD_GROUP) {
    params.filter = GET_HARD;
  } else {
    params.group = group - 1;
  }

  do {
    settedPage -= 1;
    params.page = settedPage;
    /* eslint-disable no-await-in-loop */
    const wordsResp = await getUserAggregatedWords(
      state.userId,
      state.accessToken,
      params,
    );
    /* eslint-enable no-await-in-loop */
    if (!wordsResp.isSuccess) {
      renderErrMsg(store.appOutput, wordsResp.errMsg);
      return;
    }

    if (isPageSetted) {
      wordsResp.words = wordsResp.words.filter((word) => (!word.userWord)
        || (!word.userWord.optional)
        || (!word.userWord.optional.isLearned));
    }
    store.words = store.words.concat(wordsResp.words);
  }
  while ((settedPage > 0) && (store.words.length < WORDS_PER_PAGE));

  if (store.words.length > WORDS_PER_PAGE) {
    store.words = store.words.slice(0, WORDS_PER_PAGE);
  }
};

export const updateGameWord = (isRightAnswer = false) => {
  if (!state.isUserLogged) return;

  const idx = store.currentWord;

  if (!store.words[idx].userWord) {
    const userWord: IWordProps = {
      difficulty: 'easy',
      optional: {
        isLearned: false,
        sprintAnswers: {
          right: 0,
          wrong: 0,
        },
        audiocallAnswers: {
          right: isRightAnswer ? 1 : 0,
          wrong: isRightAnswer ? 0 : 1,
        },
        rightAnswersInRow: isRightAnswer ? 1 : 0,
      },
    };
    createUserWord(state.userId, state.accessToken, store.words[idx].id, userWord);

    return;
  }

  const userWord = store.words[idx].userWord as IWordProps;

  if (!userWord.optional.audiocallAnswers) {
    userWord.optional.audiocallAnswers = {
      right: isRightAnswer ? 1 : 0,
      wrong: isRightAnswer ? 0 : 1,
    };
  }

  if (userWord.optional.rightAnswersInRow) {
    const value = userWord.optional.rightAnswersInRow;
    userWord.optional.rightAnswersInRow = isRightAnswer ? value + 1 : 0;

    if (userWord.optional.rightAnswersInRow >= ANSWERS_FOR_SET_LEARNED) {
      userWord.optional.isLearned = true;
      userWord.difficulty = 'easy';
    } else {
      userWord.optional.isLearned = false;
    }
  } else {
    const value = isRightAnswer ? 1 : 0;

    userWord.optional.rightAnswersInRow = value;
    userWord.optional.isLearned = false;
  }
  updateUserWord(state.userId, state.accessToken, store.words[idx].id, userWord);
};

export default getGameWords;
