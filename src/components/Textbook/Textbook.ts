import './textbook.css';
import './img/next-page.svg';
import './img/previous-page.svg';

import Word from './Word/Word';
import { getWords } from '../Api/wordsApi';

interface ITextbook {
  isRunning: boolean;
  currentGroup: number;
  currentPage: number;
  templateControls: string;

  create: () => void;
  createControls: () => HTMLDivElement;
  getPage: (group: number, pageNumber: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setLevel: (level: number) => void;
}

const Textbook: ITextbook = {
  isRunning: false,
  currentGroup: 0,
  currentPage: 0,

  templateControls: `
    <div class="textbook__controls-wrapper">
      <div class="textbook__controls_page">
        <button class="textbook__btn textbook__btn_previous">
          <img class="textbook__btn-img" src="./img/previous-page.svg" alt="previous icon">
        </button>
        <p class="textbook__page">1</p>
        <button class="textbook__btn textbook__btn_next">
          <img class="textbook__btn-img" src="./img/next-page.svg" alt="next icon">
        </button>
      </div>
      <div class="textbook__controls_level">
        <button class="textbook__btn textbook__btn_level">
          <p> уровень <span class="textbook__level">1</span></p>
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

    this.isRunning = true;
    textbookWrapper.classList.add('textbook');
    cardsWrapper.classList.add('textbook__cards-wrapper');
    textbookWrapper.append(this.createControls());
    textbookWrapper.append(cardsWrapper);
    this.getPage(this.currentGroup, this.currentPage);
    screen.innerHTML = '';
    screen.append(textbookWrapper);
  },

  createControls() {
    const controls = document.createElement('div');
    controls.classList.add('textbook__controls');
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
        this.setLevel(level);
      });
    });

    return controls;
  },

  getPage(group, pageNumber) {
    async function createPage() {
      const response = await getWords(group, pageNumber);
      const cardsWrapper = document.querySelector('.textbook__cards-wrapper') as HTMLDivElement;
      cardsWrapper.innerHTML = '';

      response.words.forEach((wordData) => {
        const word = new Word(wordData).render();
        cardsWrapper.append(word);
      });
    }

    createPage();
  },

  nextPage() {
    const pageCounter = document.querySelector('.textbook__page') as HTMLParagraphElement;

    if (this.currentPage < 29) {
      this.currentPage += 1;
      pageCounter.textContent = `${this.currentPage + 1}`;
      this.getPage(this.currentGroup, this.currentPage);
    } else {
      this.currentPage = 1;
      pageCounter.textContent = '1';
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

  setLevel(level) {
    const levelCounter = document.querySelector('.textbook__level') as HTMLSpanElement;
    this.getPage(level, 0);

    levelCounter.textContent = `${level}`;
  },
};

export default Textbook;
