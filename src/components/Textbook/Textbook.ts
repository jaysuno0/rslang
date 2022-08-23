import './textbook.css';
import './img/next-page.svg';
import './img/previous-page.svg';

import Word from './Word/Word';
import { getWords } from '../Api/wordsApi';

interface ITextbook {
  currentGroup: number;
  currentPage: number;
  templateControls: string;

  create: () => HTMLDivElement;
  createControls: () => HTMLDivElement;
  getPage: (group: number, pageNumber: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const Textbook: ITextbook = {
  currentGroup: 0,
  currentPage: 0,

  templateControls: `
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
        <button class="textbook__btn textbook__btn-level">
          <p> уровень <span class="textbook__level">1</span></p>
        </button>
      </div>
      <div class="textbook__controls_level">
        <ul class="textbook__levels-list">
          <li class="textbook__levels-list-item"></li>
        </ul>
      </div>`,

  create() {
    const textbookWrapper = document.createElement('div');
    const cardsWrapper = document.createElement('div');
    const screen = document.querySelector('.screen') as HTMLDivElement;

    textbookWrapper.classList.add('textbook');
    cardsWrapper.classList.add('textbook__cards-wrapper');
    textbookWrapper.append(this.createControls());
    textbookWrapper.append(cardsWrapper);
    this.getPage(this.currentGroup, this.currentPage);
    screen.innerHTML = '';
    screen.append(textbookWrapper);

    return textbookWrapper;
  },

  createControls() {
    const controls = document.createElement('div');
    controls.classList.add('textbook__controls');
    controls.innerHTML = this.templateControls;

    const nextPageBtn = controls.querySelector('.textbook__btn_next') as HTMLButtonElement;
    const previousPageBtn = controls.querySelector('.textbook__btn_previous') as HTMLButtonElement;

    nextPageBtn.addEventListener('click', () => this.nextPage());
    previousPageBtn.addEventListener('click', () => this.previousPage());

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
};

export default Textbook;
