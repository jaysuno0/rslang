interface ITextbookState {
  wordsPerPage: number;
  currentGroup: number;
  currentPage: number;
  learnedWordsNumber: number;
  lastPage: number;
  hardWordsCount: number;
  hardLevelNumber: number;
  levelPagesNumber: number;

  addLearnedWord: () => void;
  deleteLearnedWord: () => void;
  togglePageControls: (enable: boolean) => void;
  toggleGameControls: (enable: boolean) => void;
  countLastPage: () => void;
  deleteHardWord: () => void;
  togglePageLearned: (isLearned: boolean) => void;
}

const textbookState: ITextbookState = {
  wordsPerPage: 20,
  currentGroup: 0,
  currentPage: 0,
  learnedWordsNumber: 0,
  lastPage: 29,
  hardWordsCount: 0,
  hardLevelNumber: 6,
  levelPagesNumber: 29,

  addLearnedWord() {
    this.learnedWordsNumber += 1;
    if (this.learnedWordsNumber === this.wordsPerPage) this.togglePageLearned(true);
  },

  deleteLearnedWord() {
    if (this.learnedWordsNumber > 0) this.learnedWordsNumber -= 1;
    if (this.learnedWordsNumber < this.wordsPerPage) this.togglePageLearned(false);
  },

  togglePageControls(enable) {
    const previousBtn = document.querySelector('.textbook__btn_next') as HTMLButtonElement;
    const nextBtn = document.querySelector('.textbook__btn_previous') as HTMLButtonElement;
    const pageControlsWrapper = document.querySelector('.textbook__controls_page') as HTMLDivElement;
    if (enable) {
      previousBtn.removeAttribute('disabled');
      nextBtn.removeAttribute('disabled');
      pageControlsWrapper.classList.remove('disabled');
    } else {
      pageControlsWrapper.classList.add('disabled');
      previousBtn.setAttribute('disabled', '');
      nextBtn.setAttribute('disabled', '');
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

  countLastPage() {
    if (this.currentGroup !== this.hardLevelNumber) this.lastPage = this.levelPagesNumber;
    else {
      textbookState.lastPage = Math
        .floor(textbookState.hardWordsCount / textbookState.wordsPerPage);
      if (textbookState.hardWordsCount
        && textbookState.hardWordsCount % textbookState.wordsPerPage === 0) {
        textbookState.lastPage -= 1;
      }
      if (this.hardWordsCount === 0) this.toggleGameControls(false);
    }
    if (this.lastPage === 0) this.togglePageControls(false);
    else this.togglePageControls(true);
  },

  deleteHardWord() {
    this.hardWordsCount -= 1;
    this.countLastPage();
  },

  togglePageLearned(isLearned) {
    const textbook = document.querySelector('.textbook') as HTMLDivElement;

    if (isLearned) {
      textbook.classList.add('learned-page');
      this.toggleGameControls(false);
    } else {
      textbook.classList.remove('learned-page');
      this.toggleGameControls(true);
    }
  },
};

export default textbookState;
