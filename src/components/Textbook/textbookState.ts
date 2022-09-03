interface ITextbookState {
  wordsPerPage: number;
  currentGroup: number;
  currentPage: number;
  learnedWordsNumber: number;

  addLearnedWord: () => void;
  deleteLearnedWord: () => void;
<<<<<<< HEAD
  setLearnedWords: (card: HTMLDivElement) => void;
=======
  togglePageControls: (enable: boolean) => void;
  toggleGameControls: (enable: boolean) => void;
>>>>>>> 9af00a6 (feat: add textbook-controls togglers)
}

const textbookState: ITextbookState = {
  wordsPerPage: 20,
  currentGroup: 0,
  currentPage: 0,
  learnedWordsNumber: 0,

  addLearnedWord() {
    this.learnedWordsNumber += 1;
    if (this.learnedWordsNumber === this.wordsPerPage) this.toggleGameControls(false);
  },

  deleteLearnedWord() {
    if (this.learnedWordsNumber > 0) this.learnedWordsNumber -= 1;
    if (this.learnedWordsNumber < this.wordsPerPage) this.toggleGameControls(true);
  },

  togglePageControls(enable) {
    const previousBtn = document.querySelector('.textbook__btn_previous') as HTMLButtonElement;
    const nextPageBtn = document.querySelector('.textbook__btn_next') as HTMLButtonElement;
    const pageControlsWrapper = document.querySelector('.textbook__controls_page') as HTMLDivElement;

    if (enable) {
      previousBtn.removeAttribute('disabled');
      nextPageBtn.removeAttribute('disabled');
      pageControlsWrapper.classList.remove('disabled');
    } else {
      pageControlsWrapper.classList.add('disabled');
      previousBtn.setAttribute('disabled', '');
      nextPageBtn.setAttribute('disabled', '');
    }
  },

  toggleGameControls(enable) {
    const sparintBtn = document.querySelector('.textbook__btn_sprint') as HTMLButtonElement;
    const audiocallBtn = document.querySelector('.textbook__btn_audiocall') as HTMLButtonElement;
    const gameControlsWrapper = document.querySelector('.textbook__controls_games') as HTMLDivElement;

    if (enable) {
      sparintBtn.removeAttribute('disabled');
      audiocallBtn.removeAttribute('disabled');
      gameControlsWrapper.classList.remove('disabled');
    } else {
      gameControlsWrapper.classList.add('disabled');
      sparintBtn.setAttribute('disabled', '');
      audiocallBtn.setAttribute('disabled', '');
    }
  },

  setLearnedWords(card) {
    if (card.classList.contains('learned')) this.addLearnedWord();
    else this.deleteLearnedWord();
  },
};

export default textbookState;
