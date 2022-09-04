import store from './gameStore';
import { renderGameResult } from './render';
import { setGameResultHandlers } from './gameResultEvents';

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
