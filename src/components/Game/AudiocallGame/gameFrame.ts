import store from './gameStore';
import { getRandomNumber, shuffle } from './utils';
import { renderGameFrame } from './render';
import { appOutput } from './audiocallGame';
import { BASE_URL } from '../../Api/urlApi';

const MAX_ANSWERS_NUM = 5;

const generateAnswers = (answersNumber:  number) => {
  const result: number[] = [store.order[store.currentWord]];
  let answerIdx = store.currentWord;
  let answers: number[] = store.order.slice();

  for (let i = 1; i < answersNumber; i += 1) {
    answers = answers.slice(0, answerIdx).concat(answers.slice(answerIdx + 1));
    answerIdx = getRandomNumber(answers.length - 1);
    result.push(answers[answerIdx]);
  }
  shuffle(result);
  result.forEach((x, i) => store.answers[i] = store.words[x].wordTranslate);
}

const showGameFrame = () => {
  generateAnswers(Math.min(MAX_ANSWERS_NUM, store.words.length));
  store.audio.src = `${BASE_URL}/${store.words[store.order[store.currentWord]].audio}`;
  renderGameFrame(
    appOutput,
    store.words[store.order[store.currentWord]].word,
    `${BASE_URL}/${store.words[store.order[store.currentWord]].image}`,
    store.answers,
  );
};

export default showGameFrame;
