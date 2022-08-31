import './textbook.css';
import './img/next-page.svg';
import './img/previous-page.svg';

import Word from './Word/Word';
import { getWords } from '../Api/wordsApi';

type LevelColors = '#ffeacb' | '#f9ca9a' | '#f6b16a' | '#f4a04a' | '#ff826b' | '#ff6549' | '#ff3a16';

interface ITextbook {
  currentGroup: number;
  currentPage: number;
  templateControls: string;
  levelsColors: LevelColors[];

  create: () => void;
  createControls: () => HTMLDivElement;
  getPage: (level: number, pageNumber: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setLevelBackground: (level: number) => void;
}

const Textbook: ITextbook = {
  currentGroup: 0,
  currentPage: 0,
  levelsColors: ['#ffeacb', '#f9ca9a', '#f6b16a', '#f4a04a', '#ff826b', '#ff6549', '#ff3a16'],

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
    this.getPage(this.currentGroup, this.currentPage);
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
        this.getPage(level, 0);
      });
    });

    const sprintGameBtn = controls.querySelector('.textbook__btn_sprint') as HTMLButtonElement;
    const audiocallGameBtn = controls.querySelector('.textbook__btn_audiocall') as HTMLButtonElement;

    sprintGameBtn.addEventListener('click', () => console.log(`sprint game launched from textbook: level ${this.currentGroup}, page: ${this.currentPage}`));
    audiocallGameBtn.addEventListener('click', () => console.log(`audiocall game launched from textbook: level ${this.currentGroup}, page: ${this.currentPage}`));

    return controls;
  },

  getPage(level, pageNumber) {
    const pageCounter = document.querySelector('.textbook__page') as HTMLParagraphElement;
    const levelCounter = document.querySelector('.textbook__level') as HTMLSpanElement;

    this.currentGroup = level;
    this.currentPage = pageNumber;

    pageCounter.textContent = `${this.currentPage + 1}`;
    levelCounter.textContent = `${this.currentGroup + 1}`;

    async function createPage() {
      const response = await getWords(level, pageNumber);
      const cardsWrapper = document.querySelector('.textbook__cards-wrapper') as HTMLDivElement;
      cardsWrapper.innerHTML = '';

      response.words.forEach((wordData) => {
        const word = new Word(wordData).render();
        cardsWrapper.append(word);
      });
    }

    localStorage.setItem('textbookPageParams', `${level},${pageNumber}`);
    this.setLevelBackground(level);

    createPage();
  },

  nextPage() {
    if (this.currentPage < 29) {
      this.currentPage += 1;
      this.getPage(this.currentGroup, this.currentPage);
    } else {
      this.currentPage = 0;
      this.getPage(this.currentGroup, this.currentPage);
    }
  },

  previousPage() {
    const pageCounter = document.querySelector('.textbook__page') as HTMLParagraphElement;

    if (this.currentPage > 0) {
      this.currentPage -= 1;
      pageCounter.textContent = `${this.currentPage + 1}`;
      this.getPage(this.currentGroup, this.currentPage);
    } else {
      this.currentPage = 29;
      pageCounter.textContent = '30';
      this.getPage(this.currentGroup, this.currentPage);
    }
  },

  setLevelBackground(level) {
    const textbook = document.querySelector('.textbook') as HTMLDivElement;
    textbook.style.backgroundColor = this.levelsColors[level];
  },
};

export default Textbook;
