import store from './gameStore';
import { renderGameResult } from './render';
import { setGameResultHandlers } from './gameResultEvents';
import stats from '../../Statistics/Statistics';

const RESULT_MSG = [
  'В этот раз не получилось, но продолжай тренироваться!',
  'Неплохо, но есть над чем поработать',
  'Поздравляем, отличный результат!',
];

const showGameResult = () => {
  const result = (store.rightAnswerIdxs.length / store.words.length) * 100;
  let msgIdx: number;

  if (result < 50) {
    msgIdx = 0;
  } else if (result < 90) {
    msgIdx = 1;
  } else {
    msgIdx = 2;
  }

  store.stat.right = store.rightAnswerIdxs.length;
  store.stat.wrong = store.wrongAnswerIdxs.length;
  if (store.rightAnswersRange > store.stat.rightAnswersRange) {
    store.stat.rightAnswersRange = store.rightAnswersRange;
  }
  stats.update(false, store.stat);
  renderGameResult(
    store.appOutput,
    RESULT_MSG[msgIdx],
    store.rightAnswerIdxs,
    store.wrongAnswerIdxs,
    store.words,
  );
  setGameResultHandlers();
};

export default showGameResult;
