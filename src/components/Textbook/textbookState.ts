interface ITextbookState {
  wordsPerPage: number;
  currentGroup: number;
  currentPage: number;
  learnedWordsNumber: number;

  addLearnedWord: () => void;
  deleteLearnedWord: () => void;
}

const textbookState: ITextbookState = {
  wordsPerPage: 20,
  currentGroup: 0,
  currentPage: 0,
  learnedWordsNumber: 0,

  addLearnedWord() {
    this.learnedWordsNumber += 1;
    if (this.learnedWordsNumber === this.wordsPerPage) {
      const gameControls = document.querySelector('.textbook__controls_games') as HTMLDivElement;
      gameControls.querySelectorAll('button').forEach((btn) => btn.setAttribute('disabled', ''));
      gameControls.classList.add('disabled');
    }
  },

  deleteLearnedWord() {
    if (this.learnedWordsNumber > 0) this.learnedWordsNumber -= 1;
    if (this.learnedWordsNumber < this.wordsPerPage) {
      const gameControls = document.querySelector('.textbook__controls_games') as HTMLDivElement;
      gameControls.querySelectorAll('button').forEach((btn) => btn.removeAttribute('disabled'));
      gameControls.classList.remove('disabled');
    }
  },
};

export default textbookState;
