import { getWords, IWord } from '../../../Api/wordsApi';
import GameScreen from '../GameScreen/GameScreen';
import ResultScreen from '../GameScreen/ResultScreen';
import renderRightTable from '../GameScreen/rightTable';
import renderWrongTable from '../GameScreen/wrongTable';
import { footerHidden } from '../../footerHidden';

const gameScreen = new GameScreen();
const resultScreen = new ResultScreen();
const MAX_ANSWER = 19;
const RIGHT_ANSWER_SCORE = 10;
const RIGHT_ANSWER_CLASS_NAME = 'rightAnswer';
const WRONG_ANSWER_CLASS_NAME = 'wrongAnswer';

export let timerId: any;
let totalScore = 0;
let scoreBonus = 1;
let totalWrongAnswer: IWord[] = [];
let totalRightAnswer: IWord[] = [];

function fillResultTable(wrong: IWord[], right: IWord[]) {
  const rightCount = document.getElementById('rightCount');
  const wrongCount = document.getElementById('wrongCount');
  const rightWordsContainer = document.getElementById('rightWords');
  const wrongWordsContainer = document.getElementById('wrongWords');
  if (rightCount && wrongCount) {
    rightCount.innerHTML = right.length.toString();
    wrongCount.innerHTML = wrong.length.toString();
    right.forEach((word, i) => {
      const wordContainer = document.createElement('div');
      wordContainer.classList.add('table__word');
      wordContainer.innerHTML = renderRightTable(right, i);
      rightWordsContainer?.append(wordContainer);
    });

    wrong.forEach((word, i) => {
      const wordContainer = document.createElement('div');
      wordContainer.classList.add('table__word');
      wordContainer.innerHTML = renderWrongTable(wrong, i);
      wrongWordsContainer?.append(wordContainer);
    });
  }
}

function endGame() {
  resultScreen.create();
  fillResultTable(totalWrongAnswer, totalRightAnswer);
}

function timer() {
  let SECONDS = 60;
  const timerContainer = document.getElementById('timer');
  if (timerContainer) {
    timerId = setInterval(() => {
      SECONDS -= 1;
      timerContainer.innerHTML = (SECONDS).toString();
      if (SECONDS === 0) {
        clearInterval(timerId);
        endGame();
      }
    }, 1000);
  }
}

function removeAnswerClassList(card: HTMLElement, className: string) {
  card.classList.remove(`${className}`);
}

function rightAnswer(card: HTMLElement) {
  const score = document.getElementById('score__point');
  if (!score) { return; }

  totalScore += (RIGHT_ANSWER_SCORE * scoreBonus);
  score.innerHTML = `${totalScore}`;

  card.classList.add(RIGHT_ANSWER_CLASS_NAME);
  setTimeout(() => removeAnswerClassList(card, RIGHT_ANSWER_CLASS_NAME), 200);
}

function wrongAnswer(card: HTMLElement) {
  card.classList.add(WRONG_ANSWER_CLASS_NAME);
  setTimeout(() => removeAnswerClassList(card, WRONG_ANSWER_CLASS_NAME), 200);
}

function checkRightAnswer(words: IWord[]) {
  const card = document.getElementById('screen__card');
  const cardWord = document.getElementById('cardWord')?.innerHTML;
  const cardTranslate = document.getElementById('cardTranslate')?.innerHTML;
  const currentWord = words.find((word) => word.word === cardWord);
  const cardRightTranslate = currentWord?.wordTranslate;

  if (!card) { return; }
  if (!currentWord) { return; }
  if (cardTranslate === cardRightTranslate) {
    totalRightAnswer.push(currentWord);
    rightAnswer(card);
  } else {
    totalWrongAnswer.push(currentWord);
    wrongAnswer(card);
  }
}

function checkWrongAnswer(words: IWord[]) {
  const card = document.getElementById('screen__card');
  const cardWord = document.getElementById('cardWord')?.innerHTML;
  const cardTranslate = document.getElementById('cardTranslate')?.innerHTML;
  const currentWord = words.find((word) => word.word === cardWord);
  const cardRightTranslate = currentWord?.wordTranslate;

  if (!card) { return; }
  if (!currentWord) { return; }
  if (cardTranslate !== cardRightTranslate) {
    totalRightAnswer.push(currentWord);
    rightAnswer(card);
  } else {
    totalWrongAnswer.push(currentWord);
    wrongAnswer(card);
  }
}

function fillGameCard(word:string, translate: string) {
  const cardWord = document.getElementById('cardWord');
  const cardTranslate = document.getElementById('cardTranslate');
  if (cardWord && cardTranslate) {
    cardWord.innerHTML = word;
    cardTranslate.innerHTML = translate;
  }
}

function cardButtonListeners(words: IWord[], answerCount: number) {
  let countAnswer = answerCount;
  const yesAnswerButton = document.getElementById('yes');
  const noAnswerButton = document.getElementById('no');
  yesAnswerButton?.addEventListener('click', () => {
    if (countAnswer > 0) {
      checkRightAnswer(words);
      fillGameCard(words[countAnswer - 1].word, words[countAnswer - 1].translateToCompare);
      countAnswer -= 1;
    } else {
      checkRightAnswer(words);
      endGame();
    }
  });

  noAnswerButton?.addEventListener('click', () => {
    if (countAnswer > 0) {
      checkWrongAnswer(words);
      fillGameCard(words[countAnswer - 1].word, words[countAnswer - 1].translateToCompare);
      countAnswer -= 1;
    } else {
      checkWrongAnswer(words);
      endGame();
    }
  });
}

function startGame() {
  totalScore = 0;
  scoreBonus = 1;
  totalWrongAnswer = [];
  totalRightAnswer = [];
  const form = document.querySelector<HTMLSelectElement>('.select__item');
  const startButton = document.querySelector('.start-button');
  const randomPage = Math.floor(Math.random() * (30 - 1)) + 1;
  if (!form || !startButton) { return; }
  startButton.addEventListener('click', async (e) => {
    e.preventDefault();
    footerHidden();

    const gameWords = await (await getWords(+form.value - 1, randomPage)).words;
    const gameWordsState = gameWords.map((word) => {
      const isCorrect = Math.round(Math.random());
      const translateToCompare = isCorrect
        ? word.wordTranslate
        : gameWords[Math.floor(Math.random() * (19 - 1)) + 1].wordTranslate;
      return { ...word, isCorrect, translateToCompare };
    });

    gameScreen.create();
    fillGameCard(gameWordsState[MAX_ANSWER].word, gameWordsState[MAX_ANSWER].translateToCompare);
    timer();
    cardButtonListeners(gameWordsState, MAX_ANSWER);
  });
}
export default startGame;
