import { getWords, IWord } from '../../../Api/wordsApi';
import GameScreen from '../GameScreen/GameScreen';
import ResultScreen from '../GameScreen/ResultScreen';
import renderRightTable from '../GameScreen/rightTable';
import renderWrongTable from '../GameScreen/wrongTable';
import renderScoreBonusIcon from '../GameScreen/scoreBonusIcon';
import { footerHidden } from '../../footerHidden';

const gameScreen = new GameScreen();
const resultScreen = new ResultScreen();
const RIGHT_ANSWER_SCORE = 10;
const RIGHT_ANSWER_CLASS_NAME = 'rightAnswer';
const WRONG_ANSWER_CLASS_NAME = 'wrongAnswer';
const RIGHT_ANSWER_BONUS_SCORE_0 = '10';
const RIGHT_ANSWER_BONUS_SCORE_1 = '20';
const RIGHT_ANSWER_BONUS_SCORE_2 = '30';
const RIGHT_ANSWER_BONUS_SCORE_3 = '40';
const BASE = 'https://rslang142-learnwords.herokuapp.com/';
const RIGHT_ANSWER_AUDIO = new Audio('https://song.nazvonok.ru/song/e9dc/gomer-simpson-woohoo.mp3?id=21179');
const WRONG_ANSWER_AUDIO = new Audio('https://song.nazvonok.ru/song/9ff2/ugu-filina-korotkoe-uhane-filina.mp3?id=26318');

let timerId: ReturnType<typeof setTimeout>;
let totalScore = 0;
let scoreBonus = 1;
let rightAnswerBonus = 1;
let totalWrongAnswer: IWord[] = [];
let totalRightAnswer: IWord[] = [];

function fillResultTable(wrong: IWord[], right: IWord[]) {
  const rightCount = document.getElementById('rightCount');
  const wrongCount = document.getElementById('wrongCount');
  const rightWordsContainer = document.getElementById('rightWords');
  const wrongWordsContainer = document.getElementById('wrongWords');
  if (!wrongWordsContainer) { return; }
  if (!rightWordsContainer) { return; }
  if (rightCount && wrongCount) {
    rightCount.innerHTML = right.length.toString();
    wrongCount.innerHTML = wrong.length.toString();
    if (right.length === 0) {
      rightWordsContainer.innerHTML = 'У тебя нету правильных ответов , старайся лучше в следующий раз';
    }
    if (wrong.length === 0) {
      wrongWordsContainer.innerHTML = 'Отличная работа, ни одной ошибки ';
    }
    right.forEach((word, i) => {
      const wordContainer = document.createElement('div');
      wordContainer.classList.add('table__word');
      wordContainer.innerHTML = renderRightTable(right, i);
      rightWordsContainer.append(wordContainer);
      const audioButton = wordContainer.querySelector('.word__sound');
      if (!audioButton) { return; }
      audioButton.addEventListener('click', () => {
        const audioWord = new Audio(`${BASE}${word.audio}`);
        audioWord.play();
      });
    });

    wrong.forEach((word, i) => {
      const wordContainer = document.createElement('div');
      wordContainer.classList.add('table__word');
      wordContainer.innerHTML = renderWrongTable(wrong, i);
      wrongWordsContainer.append(wordContainer);
      const audioButton = wordContainer.querySelector('.word__sound');
      if (!audioButton) { return; }
      audioButton.addEventListener('click', () => {
        const audioWord = new Audio(`${BASE}${word.audio}`);
        audioWord.play();
      });
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

export function clearGameInterval() {
  clearInterval(timerId);
}

function removeAnswerClassList(card: HTMLElement, className: string) {
  card.classList.remove(`${className}`);
}

function rightAnswer(card: HTMLElement) {
  const score = document.getElementById('score__point');
  const bonusScore = document.getElementById('bonusScore');
  const bonusIconContainer = document.getElementById('iconContainer');
  if (!score) { return; }
  if (!bonusScore) { return; }
  if (!bonusIconContainer) { return; }

  RIGHT_ANSWER_AUDIO.play();

  card.classList.add(RIGHT_ANSWER_CLASS_NAME);
  setTimeout(() => removeAnswerClassList(card, RIGHT_ANSWER_CLASS_NAME), 200);

  rightAnswerBonus += 1;
  if (rightAnswerBonus > 3) {
    bonusScore.innerHTML = RIGHT_ANSWER_BONUS_SCORE_1;
    scoreBonus = 2;
    bonusIconContainer.innerHTML = renderScoreBonusIcon();
  }
  if (rightAnswerBonus > 6) {
    bonusScore.innerHTML = RIGHT_ANSWER_BONUS_SCORE_2;
    scoreBonus = 3;
    bonusIconContainer.innerHTML = renderScoreBonusIcon().repeat(2);
  }
  if (rightAnswerBonus > 9) {
    bonusScore.innerHTML = RIGHT_ANSWER_BONUS_SCORE_3;
    scoreBonus = 4;
    bonusIconContainer.innerHTML = renderScoreBonusIcon().repeat(3);
  }

  totalScore += (RIGHT_ANSWER_SCORE * scoreBonus);
  score.innerHTML = `${totalScore}`;
}

function wrongAnswer(card: HTMLElement) {
  const bonusScore = document.getElementById('bonusScore');
  const bonusIconContainer = document.getElementById('iconContainer');
  if (!bonusScore) { return; }
  if (!bonusIconContainer) { return; }

  WRONG_ANSWER_AUDIO.play();

  card.classList.add(WRONG_ANSWER_CLASS_NAME);
  setTimeout(() => removeAnswerClassList(card, WRONG_ANSWER_CLASS_NAME), 200);
  scoreBonus = 1;
  rightAnswerBonus = 1;
  bonusIconContainer.innerHTML = '';
  bonusScore.innerHTML = RIGHT_ANSWER_BONUS_SCORE_0;
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

export function fillGameCard(word:string, translate: string) {
  const cardWord = document.getElementById('cardWord');
  const cardTranslate = document.getElementById('cardTranslate');
  if (cardWord && cardTranslate) {
    cardWord.innerHTML = word;
    cardTranslate.innerHTML = translate;
  }
}

export function cardButtonListeners(words: IWord[], answerCount: number) {
  let countAnswer = answerCount;
  const yesAnswerButton = document.getElementById('yes');
  const noAnswerButton = document.getElementById('no');

  function answerYes() {
    if (countAnswer > 0) {
      checkRightAnswer(words);
      fillGameCard(words[countAnswer - 1].word, words[countAnswer - 1].translateToCompare);
      countAnswer -= 1;
    } else {
      checkRightAnswer(words);
      endGame();
    }
  }

  function answerNo() {
    if (countAnswer > 0) {
      checkWrongAnswer(words);
      fillGameCard(words[countAnswer - 1].word, words[countAnswer - 1].translateToCompare);
      countAnswer -= 1;
    } else {
      checkWrongAnswer(words);
      endGame();
    }
  }

  const answerKeyHandler = (e: KeyboardEvent) => {
    const yesButton = document.getElementById('yes');
    const noButton = document.getElementById('no');
    if (!yesButton || !noButton) {
      document.removeEventListener('keyup', answerKeyHandler);
    }
    if (e.code === 'ArrowRight') {
      answerYes();
    }
    if (e.code === 'ArrowLeft') {
      answerNo();
    }
  };
  yesAnswerButton?.addEventListener('click', () => {
    answerYes();
  });

  noAnswerButton?.addEventListener('click', () => {
    answerNo();
  });

  document.addEventListener('keyup', answerKeyHandler);
}

function startGame() {
  totalScore = 0;
  rightAnswerBonus = 1;
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
        : gameWords[Math.floor(Math.random() * (gameWords.length - 1)) + 1].wordTranslate;
      return { ...word, isCorrect, translateToCompare };
    });
    gameScreen.create();
    fillGameCard(
      gameWordsState[gameWordsState.length - 1].word,
      gameWordsState[gameWordsState.length - 1].translateToCompare,
    );
    timer();
    cardButtonListeners(gameWordsState, gameWordsState.length - 1);
  });
}
export default startGame;

export async function gameFromBook(level: number, page: number) {
  totalScore = 0;
  rightAnswerBonus = 1;
  scoreBonus = 1;
  totalWrongAnswer = [];
  totalRightAnswer = [];
  const gameWords = await (await getWords(level, page)).words;
  const gameWordsState = gameWords.map((word) => {
    const isCorrect = Math.round(Math.random());
    const translateToCompare = isCorrect
      ? word.wordTranslate
      : gameWords[Math.floor(Math.random() * (gameWords.length - 1)) + 1].wordTranslate;
    return { ...word, isCorrect, translateToCompare };
  });
  gameScreen.create();
  fillGameCard(
    gameWordsState[gameWordsState.length - 1].word,
    gameWordsState[gameWordsState.length - 1].translateToCompare,
  );
  timer();
  cardButtonListeners(gameWordsState, gameWordsState.length - 1);
}
