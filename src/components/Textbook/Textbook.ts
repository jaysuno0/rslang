import './textbook.css';
import './img/next-page.svg';
import './img/previous-page.svg';
import './img/hard-black.svg';

import Word from './Word/Word';
import { gameFromBook } from '../Game/GameSprint/LevelSelect/sprintSelectInit';
import state from '../../state';
import textbookState from './textbookState';
import { getWords, IWord } from '../Api/wordsApi';
import { getUserAggregatedWords, IWordsParams, GET_HARD } from '../Api/userAggregatedWords';
import audiocallStart from '../Game/AudiocallGame/audiocallGame';

interface ITextbook {
  templateControls: string;

  create: () => void;
  createControls: () => HTMLDivElement;
  getWords: (isHard: boolean) => void;
  addCardsToPage: (words: IWord[]) => void;
  setPage: (level: number, page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const Textbook: ITextbook = {
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
        <li class="textbook__levels-list-item hard-words hidden">
          <img class="textbook__hard-level-img" src="./img/hard.svg" alt="hard icon">
        </li>
    </ul>`,

  create() {
    const textbookWrapper = document.createElement('div');
    const cardsWrapper = document.createElement('div');
    const screen = document.querySelector('.screen') as HTMLDivElement;
    const pageParamsString = localStorage.getItem('textbookPageParams');

    if (pageParamsString) {
      const params = pageParamsString.split(',').map((item) => Number(item));
      [textbookState.currentGroup, textbookState.currentPage] = params;
    }

    textbookWrapper.classList.add('textbook');
    cardsWrapper.classList.add('textbook__cards-wrapper');
    textbookWrapper.append(this.createControls());
    textbookWrapper.append(cardsWrapper);
    screen.innerHTML = '';
    screen.append(textbookWrapper);
    this.setPage(textbookState.currentGroup, textbookState.currentPage);
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
      let level = parseInt(levelElement, 10) - 1;

      btn.addEventListener('click', () => {
        levelsList.classList.toggle('hidden');
        if (Number.isNaN(level)) level = 6;
        this.setPage(level, 0);
      });
    });

    if (state.isUserLogged) {
      const hardLevelBtn = controls.querySelector('.hard-words') as HTMLElement;
      hardLevelBtn.classList.remove('hidden');
    }

    const sprintGameBtn = controls.querySelector('.textbook__btn_sprint') as HTMLButtonElement;
    const audiocallGameBtn = controls.querySelector('.textbook__btn_audiocall') as HTMLButtonElement;
    sprintGameBtn.addEventListener('click', () => gameFromBook(textbookState.currentGroup, textbookState.currentPage));
    audiocallGameBtn.addEventListener('click', () => {
      audiocallStart(true, textbookState.currentGroup + 1, textbookState.currentPage + 1);
    });
    return controls;
  },

  addCardsToPage(words) {
    const cardsWrapper = document.querySelector('.textbook__cards-wrapper') as HTMLDivElement;
    cardsWrapper.innerHTML = '';
    words.forEach((wordData) => {
      const word = new Word(wordData);
      word.addCardToPage();
    });
  },

  async getWords(isHard: boolean) {
    if (state.isUserLogged) {
      let words: IWord[];
      const params: IWordsParams = {
        wordsPerPage: textbookState.wordsPerPage,
        page: textbookState.currentPage,
      };

      if (isHard) {
        params.filter = GET_HARD;
        const response = await getUserAggregatedWords(state.userId, state.accessToken, params);
        words = response.words;
        if (response.totalCount) {
          textbookState.hardWordsCount = response.totalCount;
        } else textbookState.lastPage = 0;
      } else {
        textbookState.lastPage = 29;
        params.group = textbookState.currentGroup;
        words = (await getUserAggregatedWords(state.userId, state.accessToken, params)).words;
      }
      this.addCardsToPage(words);

      if (isHard && words.length === 0) {
        const cardsWrapper = document.querySelector('.textbook__cards-wrapper') as HTMLDivElement;
        cardsWrapper.innerHTML = '<p class="textbook__message">Вы ещё не отметили ни одно слово, как сложное :)</p>';
      }
    } else {
      const words = await getWords(textbookState.currentGroup, textbookState.currentPage);
      this.addCardsToPage(words.words);
    }
    textbookState.countLastPage();
  },

  setPage(level, pageNumber) {
    const pageCounter = document.querySelector('.textbook__page') as HTMLParagraphElement;
    const levelCounter = document.querySelector('.textbook__level') as HTMLSpanElement;

    textbookState.learnedWordsNumber = 0;
    textbookState.currentGroup = level;
    textbookState.currentPage = pageNumber;
    pageCounter.textContent = `${textbookState.currentPage + 1}`;
    levelCounter.textContent = `${textbookState.currentGroup + 1}`;

    if (level === 6) {
      levelCounter.innerHTML = '<img class="textbook__hard-level-img" src="./img/hard-black.svg" alt="hard icon">';
      this.getWords(true);
    } else this.getWords(false);

    textbookState.toggleGameControls(true);
    localStorage.setItem('textbookPageParams', `${level},${pageNumber}`);
  },

  nextPage() {
    if (textbookState.currentPage < textbookState.lastPage) {
      textbookState.currentPage += 1;
      this.setPage(textbookState.currentGroup, textbookState.currentPage);
    } else {
      textbookState.currentPage = 0;
      this.setPage(textbookState.currentGroup, textbookState.currentPage);
    }
  },

  previousPage() {
    const pageCounter = document.querySelector('.textbook__page') as HTMLParagraphElement;

    if (textbookState.currentPage > 0) {
      textbookState.currentPage -= 1;
      pageCounter.textContent = `${textbookState.currentPage + 1}`;
      this.setPage(textbookState.currentGroup, textbookState.currentPage);
    } else {
      textbookState.currentPage = textbookState.lastPage;
      pageCounter.textContent = `${textbookState.lastPage}`;
      this.setPage(textbookState.currentGroup, textbookState.currentPage);
    }
  },
};

export default Textbook;
