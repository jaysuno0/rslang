import { getWords, IWord } from '../../../Api/wordsApi';
import { getUserAggregatedWords, IWordsParams, GET_HARD } from '../../../Api/userAggregatedWords';
import GameScreen from '../GameScreen/GameScreen';
import ResultScreen from '../GameScreen/ResultScreen';
import renderRightTable from '../GameScreen/rightTable';
import renderWrongTable from '../GameScreen/wrongTable';
import renderScoreBonusIcon from '../GameScreen/scoreBonusIcon';
import { footerHidden } from '../../footerHidden';
import { IWordProps, createUserWord, updateUserWord } from '../../../Api/userWordsApi';
/* eslint-disable import/no-cycle */
import state from '../../../../state';

const gameScreen = new GameScreen();
const resultScreen = new ResultScreen();
const RIGHT_ANSWER_SCORE = 10;
const WORDS_PER_PAGE = 20;
const HARD_GROUP = 7;
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

async function resultLearningRight(right: IWord[], userId:string, token: string) {
  let learned: boolean;
  let difficulty: string;

  right.forEach(async (word) => {
    const newWordProps: IWordProps = {
      difficulty: 'easy',
      optional: {
        isLearned: false,
        sprintAnswers: {
          right: 1,
          wrong: 0,
        },
        audiocallAnswers: {
          right: 0,
          wrong: 0,
        },
        rightAnswersInRow: 1,
      },
    };
    console.log(word.userWord, word.word, 'before');
    if (word.userWord === undefined) {
      console.log('hi');
      
      await createUserWord(userId, token, word.id, newWordProps);
    } else {
      if (word.userWord.optional.sprintAnswers === undefined) { return; }
      if (word.userWord.optional.rightAnswersInRow === undefined) { return; }

      if ((word.userWord.optional.rightAnswersInRow + 1) >= 3) {
        learned = true;
        difficulty = 'easy';
      } else {
        learned = false;
        difficulty = word.userWord.difficulty;
      }
      const updateWordProps: IWordProps = {
        difficulty,
        optional: {
          isLearned: learned,
          sprintAnswers: {
            right: word.userWord.optional.sprintAnswers.right + 1,
            wrong: word.userWord.optional.sprintAnswers.wrong,
          },
          rightAnswersInRow: word.userWord.optional.rightAnswersInRow + 1,
        },
      };
      await updateUserWord(userId, token, word.id, updateWordProps);
      console.log(word.userWord.optional, word.word, 'right');
      
    }
  });
}

async function resultLearningWrong(wrong: IWord[], userId:string, token: string) {
  wrong.forEach(async (word) => {
    const newWordProps: IWordProps = {
      difficulty: 'easy',
      optional: {
        isLearned: false,
        sprintAnswers: {
          right: 0,
          wrong: 1,
        },
        audiocallAnswers: {
          right: 0,
          wrong: 0,
        },
        rightAnswersInRow: 0,
      },
    };

    if (word.userWord === undefined) {
      await createUserWord(userId, token, word.id, newWordProps);
    } else {
      if (word.userWord.optional.sprintAnswers === undefined) { return; }
      if (word.userWord.optional.rightAnswersInRow === undefined) { return; }

      const updateWordProps: IWordProps = {
        difficulty: word.userWord.difficulty,
        optional: {
          isLearned: false,
          sprintAnswers: {
            right: word.userWord.optional.sprintAnswers.right,
            wrong: word.userWord.optional.sprintAnswers.wrong + 1,
          },
          rightAnswersInRow: 0,
        },
      };
      await updateUserWord(userId, token, word.id, updateWordProps);
      console.log(word.userWord.optional, word.word, 'wrong');
    }
  });
}

function endGame() {
  resultScreen.create();
  fillResultTable(totalWrongAnswer, totalRightAnswer);
  if (state.isUserLogged) {
    resultLearningRight(totalRightAnswer, state.userId, state.accessToken);
    resultLearningWrong(totalWrongAnswer, state.userId, state.accessToken);
  }
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

  RIGHT_ANSWER_AUDIO.volume = 0.3;
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

  WRONG_ANSWER_AUDIO.volume = 0.3;
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
      e.preventDefault();
      answerYes();
    }
    if (e.code === 'ArrowLeft') {
      e.preventDefault();
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

const gameWordsState = (words:IWord[]) => {
  const wordsWithCompare = words.map((word) => {
    const isCorrect = Math.round(Math.random());
    const translateToCompare = isCorrect
      ? word.wordTranslate
      : words[Math.floor(Math.random() * (words.length - 1)) + 1].wordTranslate;
    return { ...word, isCorrect, translateToCompare };
  });
  return wordsWithCompare;
};

function initGame(gameWords:IWord[]) {
  gameScreen.create();
  fillGameCard(
    gameWords[gameWords.length - 1].word,
    gameWords[gameWords.length - 1].translateToCompare,
  );
  timer();
  cardButtonListeners(gameWords, gameWords.length - 1);
}

function renderWordMessage(appOutput: HTMLDivElement) {
  const output = appOutput;

  output.innerHTML = '<p>Еще секунду, слова загружаются...</p>';
}

function startGame() {
  totalScore = 0;
  rightAnswerBonus = 1;
  scoreBonus = 1;
  totalWrongAnswer = [];
  totalRightAnswer = [];
  const screen = document.querySelector<HTMLDivElement>('.screen');
  const form = document.querySelector<HTMLSelectElement>('.select__item');
  const startButton = document.querySelector('.start-button');
  const randomPage = Math.floor(Math.random() * (30 - 1)) + 1;
  if (!form || !startButton) { return; }
  startButton.addEventListener('click', async (e) => {
    e.preventDefault();
    footerHidden();
    const params: IWordsParams = {
      group: +form.value - 1,
      page: randomPage,
      wordsPerPage: 20,
    };
    if (screen) {
      renderWordMessage(screen);
    }

    if (state.isUserLogged) {
      const WordsUser = (await getUserAggregatedWords(
        state.userId,
        state.accessToken,
        params,
      )).words;
      const gameWordsUser = gameWordsState(WordsUser);
      initGame(gameWordsUser);
    } else {
      const wordsGuest = await (await getWords(+form.value - 1, randomPage)).words;
      const gameWordsUser = gameWordsState(wordsGuest);
      initGame(gameWordsUser);
    }
  });
}
export default startGame;

interface IStore {
  words: Array<IWord>;
  order: Array<number>;
  answers: Array<string>;
  currentWord: number;
  isAnswered: boolean;
  isEventsDisabled: boolean;

}

const store: IStore = {
  words: [],
  order: [],
  answers: [],
  currentWord: 0,
  isAnswered: false,
  isEventsDisabled: false,
};

export async function gameFromBook(level: number, page: number) {
  let settedPage = page + 1;
  totalScore = 0;
  rightAnswerBonus = 1;
  scoreBonus = 1;
  totalWrongAnswer = [];
  totalRightAnswer = [];

  if (state.isUserLogged) {
    const params: IWordsParams = {
      group: level,
      page: settedPage,
      wordsPerPage: WORDS_PER_PAGE,
    };

    if (level === HARD_GROUP) {
      params.filter = GET_HARD;
    } else {
      params.group = level;
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
      if (!wordsResp.isSuccess) {
        return;
      }

      if (page !== undefined) {
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
    const gameWordsUser = gameWordsState(store.words);
    initGame(gameWordsUser);
  } else {
    const WordsUser = await (await getWords(level, page)).words;
    const gameWordsUser = gameWordsState(WordsUser);
    initGame(gameWordsUser);
  }
}
