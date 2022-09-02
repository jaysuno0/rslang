import store from './gameStore';
import { getRandomNumber, shuffle } from './utils';
import { renderGameFrame } from './render';
import { BASE_URL } from '../../Api/urlApi';

const MAX_ANSWERS_NUM = 5;
const GREEN = 'green-answer';
const RED = 'red-answer';

const generateAnswers = (answersNumber: number) => {
  const result: number[] = [store.order[store.currentWord]];
  let answerIdx = store.currentWord;
  let answers: number[] = store.order.slice();

  for (let i = 1; i < answersNumber; i += 1) {
    answers = answers.slice(0, answerIdx).concat(answers.slice(answerIdx + 1));
    answerIdx = getRandomNumber(answers.length - 1);
    result.push(answers[answerIdx]);
  }
  shuffle(result);
  result.forEach((x, i) => { store.answers[i] = store.words[x].wordTranslate; });
};

export const showGameFrame = () => {
  store.isEventsDisabled = true;
  generateAnswers(Math.min(MAX_ANSWERS_NUM, store.words.length));
  store.audio.src = `${BASE_URL}/${store.words[store.order[store.currentWord]].audio}`;
  renderGameFrame(
    store.appOutput,
    store.words[store.order[store.currentWord]].word,
    `${BASE_URL}/${store.words[store.order[store.currentWord]].image}`,
    store.answers,
  );
  store.isAnswered = false;
  store.isEventsDisabled = false;
};

const markAnswer = (answerIdx: number, style: string) => {
  const answers = document.querySelectorAll<HTMLSpanElement>('.game-frame__answer');

  if (!answers.length) throw new Error('Error in HTML');

  answers.forEach((answer) => answer.classList.remove('game-frame__answer'));
  answers[answerIdx]?.classList.add(`game-frame__${style}`);
};

export const setAnswer = (answer = 0) => {
  const nextBtn = document.querySelector('.game-frame__btn');
  const audioBtn = document.querySelector('.game-frame__audio-btn');
  const word = document.querySelector('#word') as HTMLElement;
  const img = document.querySelector('.game-frame__word-image') as HTMLElement;

  if (!nextBtn || !audioBtn || !word || !img) throw new Error('Error in HTML');

  const rightAnswer = store.answers.indexOf(
    store.words[store.order[store.currentWord]].wordTranslate,
  );

  store.isAnswered = true;
  if (answer === 0) {
    markAnswer(rightAnswer, GREEN);
  } else {
    const userAnswer = answer - 1;
    const color = userAnswer === rightAnswer ? GREEN : RED;
    markAnswer(userAnswer, color);
  }
  nextBtn.innerHTML = 'Дальше &#9658;';
  audioBtn.classList.remove('big');
  word.style.display = 'block';
  img.style.display = 'block';
};
