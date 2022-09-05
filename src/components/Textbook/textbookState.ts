interface ITextbookState {
  wordsPerPage: number;
  currentGroup: number;
  currentPage: number;
  learnedWordsNumber: number;
  lastPage: number;
  hardWordsCount: number;

  addLearnedWord: () => void;
  deleteLearnedWord: () => void;
  toggleGameControls: (enable: boolean) => void;
  countLastPage: () => void;
  deleteHardWord: () => void;
}

const textbookState: ITextbookState = {
  wordsPerPage: 20,
  currentGroup: 0,
  currentPage: 0,
  learnedWordsNumber: 0,
  lastPage: 29,
  hardWordsCount: 0,

  addLearnedWord() {
    this.learnedWordsNumber += 1;
    if (this.learnedWordsNumber === this.wordsPerPage) this.toggleGameControls(false);
  },

  deleteLearnedWord() {
    if (this.learnedWordsNumber > 0) this.learnedWordsNumber -= 1;
    if (this.learnedWordsNumber < this.wordsPerPage) this.toggleGameControls(true);
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
    textbookState.lastPage = Math.floor(textbookState.hardWordsCount / textbookState.wordsPerPage);
    if (textbookState.hardWordsCount % textbookState.wordsPerPage === 0) {
      textbookState.lastPage -= 1;
    }
    if (this.hardWordsCount === 0) this.toggleGameControls(false);
  },

  deleteHardWord() {
    this.hardWordsCount -= 1;
    this.countLastPage();
  },
};

export default textbookState;
