import { getWords, IWord } from '../../../Api/wordsApi';
import timer from '../timer/timer';
import GameScreen from '../GameScreen/GameScreen';

const gameScreen = new GameScreen();
const MAX_ANSWER = 19;
const RIGHT_ANSWER_SCORE = 10;
const RIGHT_ANSWER_CLASS_NAME = 'rightAnswer';
const WRONG_ANSWER_CLASS_NAME = 'wrongAnswer';

let totalScore = 0;
const scoreBonus = 1;

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
  const cardRightTranslate = words.find((word) => word.word === cardWord)?.wordTranslate;

  if (!card) { return; }
  if (cardTranslate === cardRightTranslate) {
    rightAnswer(card);
  } else {
    wrongAnswer(card);
  }
}

function checkWrongAnswer(words: IWord[]) {
  const card = document.getElementById('screen__card');
  const cardWord = document.getElementById('cardWord')?.innerHTML;
  const cardTranslate = document.getElementById('cardTranslate')?.innerHTML;
  const cardRightTranslate = words.find((word) => word.word === cardWord)?.wordTranslate;

  if (!card) { return; }
  if (cardTranslate !== cardRightTranslate) {
    rightAnswer(card);
  } else {
    wrongAnswer(card);
  }
}

function fill(word:string, translate: string) {
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
      fill(words[countAnswer - 1].word, words[countAnswer - 1].translateToCompare);
      countAnswer -= 1;
    } else {
      checkRightAnswer(words);
      console.log('end callback');
    }
  });

  noAnswerButton?.addEventListener('click', () => {
    if (countAnswer > 0) {
      checkWrongAnswer(words);
      fill(words[countAnswer - 1].word, words[countAnswer - 1].wordTranslate);
      countAnswer -= 1;
    } else {
      checkWrongAnswer(words);
      console.log('end callback');
    }
  });
}

function startGame() {
  const form = document.querySelector<HTMLSelectElement>('.select__item');
  const startButton = document.querySelector('.start-button');
  const randomPage = Math.floor(Math.random() * (30 - 1)) + 1;
  if (!form || !startButton) { return; }
  startButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const gameWords = await (await getWords(+form.value - 1, randomPage)).words;

    const gameWordsState = gameWords.map((word) => {
      const isCorrect = Math.round(Math.random());
      const translateToCompare = isCorrect
        ? word.wordTranslate
        : gameWords[Math.floor(Math.random() * (19 - 1)) + 1].wordTranslate;
      return { ...word, isCorrect, translateToCompare };
    });

    const sortGameWords = gameWordsState.sort(() => Math.random() - 0.5);
    gameScreen.create();
    fill(sortGameWords[MAX_ANSWER].word, sortGameWords[MAX_ANSWER].translateToCompare);
    timer();
    cardButtonListeners(sortGameWords, MAX_ANSWER);
  });
}
export default startGame;
