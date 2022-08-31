import './word.css';
import '../img/sound.svg';
import '../img/hard.svg';
import '../img/learned.svg';
import { IWord } from '../../Api/wordsApi';
import { createUserWord, IWordProps, updateUserWord } from '../../Api/userWordsApi';
import state from '../../../state';

class Word {
  word: IWord;

  base: string;

  template: string;

  constructor(word: IWord) {
    this.word = word;
    this.base = 'https://rslang142-learnwords.herokuapp.com/';
    this.template = `
      <button class="card__btn card__btn_sound btn-sound">
        <img class="card__sound-btn-image btn-sound" src="./img/sound.svg" alt="sound icon">
      </button>
      <button class="card__btn card__btn_hard btn-hard hidden">
        <img class="card__btn-image btn-hard" src="./img/hard.svg" alt="sound icon">
      </button>
      <button class="card__btn card__btn_learned btn-learned hidden">
        <img class="card__sound-btn-image btn-learned" src="./img/learned.svg" alt="learned icon">
      </button>
      <img class="card__img" alt="word picture">
      <div class="card__info-wrapper">
        <div class="card__wrapper card__wrapper_word">
          <p class="card__word"></p>
          <p class="card__transcription"></p>
          <p class="card__translation"></p>
        </div>
        <div class="card__wrapper card__wrapper_definition">
          <p class="card__definition"></p>
          <p class="card__definition-translation"></p></p>
        </div>
        <div class="card__wrapper card__wrapper_example">
          <p class="card__example"></p>
          <p class="card__example-translation"></p></p>
        </div>
      </div>`;
  }

  createCard() {
    const card = document.createElement('div');
    card.classList.add('textbook__card', 'card');
    card.innerHTML = this.template;

    return card;
  }

  render() {
    const card = this.createCard();
    const img = card.querySelector('.card__img') as HTMLImageElement;
    const word = card.querySelector('.card__word') as HTMLParagraphElement;
    const transcription = card.querySelector('.card__transcription') as HTMLParagraphElement;
    const wordTranslation = card.querySelector('.card__translation') as HTMLParagraphElement;
    const definition = card.querySelector('.card__definition') as HTMLParagraphElement;
    const definitionTranslation = card.querySelector('.card__definition-translation') as HTMLParagraphElement;
    const example = card.querySelector('.card__example') as HTMLParagraphElement;
    const exampleTranslation = card.querySelector('.card__example-translation') as HTMLParagraphElement;

    img.setAttribute('src', this.base + this.word.image);
    word.textContent = this.word.word;
    transcription.textContent = this.word.transcription;
    wordTranslation.textContent = this.word.wordTranslate;
    definition.innerHTML = this.word.textMeaning;
    definitionTranslation.textContent = this.word.textMeaningTranslate;
    example.innerHTML = this.word.textExample;
    exampleTranslation.textContent = this.word.textExampleTranslate;

    this.activateButtons(card);

    return card;
  }

  activateSound() {
    const audioWord = new Audio(`${this.base}${this.word.audio}`);
    const audioMeaning = new Audio(`${this.base}${this.word.audioMeaning}`);
    const audioExample = new Audio(`${this.base}${this.word.audioExample}`);

    audioWord.play();
    audioWord.onended = () => audioMeaning.play();
    audioMeaning.onended = () => audioExample.play();
  }

  toggleHard(card: HTMLDivElement) {
    const wordProps: IWordProps = {
      difficulty: 'hard',
      optional: {
        isLearned: false,
      },
    };

    card.classList.toggle('hard');

    if (card.classList.contains('hard')) {
      wordProps.optional.isLearned = false;
      createUserWord(state.userId, state.accessToken, this.word.id, wordProps);
    } else {
      wordProps.difficulty = 'easy';
      updateUserWord(state.userId, state.accessToken, this.word.id, wordProps);
    }
  }

  toggleLearned(card: HTMLDivElement) {
    const wordProps: IWordProps = {
      difficulty: 'easy',
      optional: {
        isLearned: true,
      },
    };

    card.classList.toggle('learned');

    if (card.classList.contains('learned')) {
      wordProps.optional.isLearned = true;
      createUserWord(state.userId, state.accessToken, this.word.id, wordProps);
    } else {
      wordProps.optional.isLearned = false;
      updateUserWord(state.userId, state.accessToken, this.word.id, wordProps);
    }
  }

  activateButtons(card: HTMLDivElement) {
    const hardBtn = card.querySelector('.btn-hard') as HTMLButtonElement;
    const learnedBtn = card.querySelector('.btn-learned') as HTMLButtonElement;

    if (state.isUserLogged) {
      hardBtn.classList.remove('hidden');
      learnedBtn.classList.remove('hidden');
    }

    card.addEventListener('click', (event) => {
      const btn = event.target as HTMLElement;

      if (btn.classList.contains('btn-sound')) {
        this.activateSound();
      } else if (btn.classList.contains('btn-hard')) {
        this.toggleHard(card);
      } else if (btn.classList.contains('btn-learned')) {
        this.toggleLearned(card);
      }
    });
  }
}

export default Word;
