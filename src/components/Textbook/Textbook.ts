import './textbook.css';
import './img/next-page.svg';
import './img/previous-page.svg';

import Word from './Word/Word';
import { getWords, IWord } from '../Api/wordsApi';
import state from '../../state';
import { getUserAggregatedWords, IWordsParams } from '../Api/userAggregatedWords';

interface ITextbook {
  wordsPerPage: number;
  currentGroup: number;
  currentPage: number;
  learnedWordsNumber: number;
  templateControls: string;

  create: () => void;
  createControls: () => HTMLDivElement;
  addCardsToPage: (words: IWord[]) => void;
  setPage: (level: number, pageNumber: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setCardState: (wordData: Word, card: HTMLDivElement) => void;
  addLearnedWord: () => void;
}

const Textbook: ITextbook = {
  wordsPerPage: 20,
  currentGroup: 0,
  currentPage: 0,
  learnedWordsNumber: 0,

  templateControls: `
    <div class="textbook__controls-wrapper">
      <div class="textbook__controls textbook__controls_page">
        <button class="textbook__btn textbook__btn_previous">
          <img class="textbook__btn-img" src="./img/previous-page.svg" alt="previous icon">
        </button>
        <p class="textbook__page">1</p>
        <button class="textbook__btn textbook__btn_next">
          <img class="textbook__btn-img" src="./img/next-page.svg" alt="next icon">
        </button>
      </div>
      <div class="textbook__controls textbook__controls_level">
        <button class="textbook__btn textbook__btn_level">
          <p> уровень <span class="textbook__level">1</span></p>
        </button>
      </div>
      <div class="textbook__controls textbook__controls_games">
        <p>игры: </p>
        <button class="textbook__btn textbook__btn_sprint">
          <img class="textbook__btn-img" src="./img/gameSelectSprint1.png" alt="sprint game icon">
        </button>
        <button class="textbook__btn textbook__btn_audiocall">
          <img class="textbook__btn-img" src="./img/gameSelectAudio2.svg" alt="audiocall game icon">
        </button>
      </div>
    </div>
    <ul class="textbook__levels-list hidden">
        <li class="textbook__levels-list-item">1</li>
        <li class="textbook__levels-list-item">2</li>
        <li class="textbook__levels-list-item">3</li>
        <li class="textbook__levels-list-item">4</li>
        <li class="textbook__levels-list-item">5</li>
        <li class="textbook__levels-list-item">6</li>
    </ul>`,

  create() {
    const textbookWrapper = document.createElement('div');
    const cardsWrapper = document.createElement('div');
    const screen = document.querySelector('.screen') as HTMLDivElement;
    const pageParamsString = localStorage.getItem('textbookPageParams');

    if (pageParamsString) {
      const params = pageParamsString.split(',').map((item) => Number(item));
      [this.currentGroup, this.currentPage] = params;
    }

    textbookWrapper.classList.add('textbook');
    cardsWrapper.classList.add('textbook__cards-wrapper');
    textbookWrapper.append(this.createControls());
    textbookWrapper.append(cardsWrapper);
    screen.innerHTML = '';
    screen.append(textbookWrapper);
    this.setPage(this.currentGroup, this.currentPage);
  },

  createControls() {
    const controls = document.createElement('div');
    controls.classList.add('textbook__controls-container');
    controls.innerHTML = this.templateControls;

    const nextPageBtn = controls.querySelector('.textbook__btn_next') as HTMLButtonElement;
    const previousPageBtn = controls.querySelector('.textbook__btn_previous') as HTMLButtonElement;
    nextPageBtn.addEventListener('click', () => this.nextPage());
    previousPageBtn.addEventListener('click', () => this.previousPage());

    const levelsListBtn = controls.querySelector('.textbook__btn_level') as HTMLButtonElement;
    const levelsList = controls.querySelector('.textbook__levels-list') as HTMLDivElement;
    const levelBtns = controls.querySelectorAll('.textbook__levels-list-item');
    levelsListBtn.addEventListener('click', () => levelsList.classList.toggle('hidden'));
    levelBtns.forEach((btn) => {
      const levelElement = btn.textContent as string;
      const level = parseInt(levelElement, 10) - 1;

      btn.addEventListener('click', () => {
        levelsList.classList.toggle('hidden');
        this.setPage(level, 0);
      });
    });

    const sprintGameBtn = controls.querySelector('.textbook__btn_sprint') as HTMLButtonElement;
    const audiocallGameBtn = controls.querySelector('.textbook__btn_audiocall') as HTMLButtonElement;
    sprintGameBtn.addEventListener('click', () => console.log(`sprint game launched from textbook: level ${this.currentGroup}, page: ${this.currentPage}`));
    audiocallGameBtn.addEventListener('click', () => console.log(`audiocall game launched from textbook: level ${this.currentGroup}, page: ${this.currentPage}`));

    return controls;
  },

  setCardState(wordData, card) {
    const word = wordData;
    if (word.word.userWord?.difficulty === 'hard') {
      card.classList.add('hard');
      word.isUserWord = true;
    } else if (word.word.userWord?.optional.isLearned) {
      card.classList.add('learned');
      this.addLearnedWord();
      word.isUserWord = true;
    }
  },

  addCardsToPage(cards) {
    const cardsWrapper = document.querySelector('.textbook__cards-wrapper') as HTMLDivElement;
    cardsWrapper.innerHTML = '';

    cards.forEach((wordData) => {
      const word = new Word(wordData);
      const card = word.render();
      cardsWrapper.append(card);

      if (state.isUserLogged) {
        this.setCardState(word, card);
      }
    });
  },

  setPage(level, pageNumber) {
    const pageCounter = document.querySelector('.textbook__page') as HTMLParagraphElement;
    const levelCounter = document.querySelector('.textbook__level') as HTMLSpanElement;
    this.currentGroup = level;
    this.currentPage = pageNumber;
    pageCounter.textContent = `${this.currentPage + 1}`;
    levelCounter.textContent = `${this.currentGroup + 1}`;

    const createPage = async () => {
      if (state.isUserLogged) {
        const params: IWordsParams = {
          group: level,
          page: pageNumber,
          wordsPerPage: this.wordsPerPage,
        };
        const words = await getUserAggregatedWords(state.userId, state.accessToken, params);
        this.addCardsToPage(words.words);
      } else {
        const words = await getWords(level, pageNumber);
        this.addCardsToPage(words.words);
      }
    };

    localStorage.setItem('textbookPageParams', `${level},${pageNumber}`);
    createPage();
  },

  nextPage() {
    if (this.currentPage < 29) {
      this.currentPage += 1;
      this.setPage(this.currentGroup, this.currentPage);
    } else {
      this.currentPage = 0;
      this.setPage(this.currentGroup, this.currentPage);
    }
  },

  previousPage() {
    const pageCounter = document.querySelector('.textbook__page') as HTMLParagraphElement;

    if (this.currentPage > 0) {
      this.currentPage -= 1;
      pageCounter.textContent = `${this.currentPage + 1}`;
      this.setPage(this.currentGroup, this.currentPage);
    } else {
      this.currentPage = 29;
      pageCounter.textContent = '30';
      this.setPage(this.currentGroup, this.currentPage);
    }
  },

  addLearnedWord() {
    this.learnedWordsNumber += 1;
    if (this.learnedWordsNumber === this.wordsPerPage) {
      const gameControls = document.querySelector('.textbook__controls_games') as HTMLDivElement;
      gameControls.querySelectorAll('button').forEach((btn) => btn.setAttribute('disabled', ''));
    }
  },
};

export default Textbook;
