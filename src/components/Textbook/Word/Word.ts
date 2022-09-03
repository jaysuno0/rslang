import './word.css';
import '../img/sound.svg';
import '../img/hard.svg';
import '../img/learned.svg';
import state from '../../../state';
import { IWord } from '../../Api/wordsApi';
import {
  createUserWord,
  deleteUserWord,
  getUserWord,
  IWordProps,
  updateUserWord,
  IUserWordResp,
} from '../../Api/userWordsApi';
import textbookState from '../textbookState';

function createWordState():IWordProps {
  const newWordState: IWordProps = {
    difficulty: 'easy',
    optional: {
      isLearned: false,
    },
  };

  return newWordState;
}

class Word {
  word: IWord;

  isUserWord: boolean;

  base: string;

  template: string;

  constructor(word: IWord) {
    this.isUserWord = false;
    this.word = word;
    this.base = 'https://rslang142-learnwords.herokuapp.com/';
    this.template = `
      <button class="card__btn card__btn_sound btn-sound" title="воспроизвести аудио">
        <img class="card__sound-btn-image btn-sound" src="./img/sound.svg" alt="sound icon">
      </button>
      <button class="card__btn card__btn_hard btn-hard hidden" title="добавить в список сложных">
        <img class="card__btn-image btn-hard" src="./img/hard.svg" alt="sound icon">
      </button>
      <button class="card__btn card__btn_learned btn-learned hidden" title="добавить в список изученных">
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

  updateOrDelete(props: IWordProps) {
    const { id } = this.word;
    if (props.difficulty === 'easy' && props.optional.isLearned === false) {
      deleteUserWord(state.userId, state.accessToken, id);
      this.isUserWord = false;
    } else updateUserWord(state.userId, state.accessToken, id, props);
  }

  async toggleHard(card: HTMLDivElement) {
    if (card.classList.contains('learned')) textbookState.deleteLearnedWord();
    card.classList.toggle('hard');
    const newWordState = createWordState();

    if (this.isUserWord) {
      const resp: IUserWordResp = await getUserWord(state.userId, state.accessToken, this.word.id);
      newWordState.optional = resp.userWord.optional;
      if (card.classList.contains('hard')) {
        card.classList.remove('learned');
        newWordState.optional.isLearned = false;
        newWordState.difficulty = 'hard';
      }
      this.updateOrDelete(newWordState);
    } else {
      if (card.classList.contains('hard')) newWordState.difficulty = 'hard';
      this.isUserWord = true;
      createUserWord(state.userId, state.accessToken, this.word.id, newWordState);
    }
  }

  async toggleLearned(card: HTMLDivElement) {
    card.classList.toggle('learned');
    textbookState.setLearnedWords(card);
    const newWordState = createWordState();

    if (this.isUserWord) {
      const resp: IUserWordResp = await getUserWord(state.userId, state.accessToken, this.word.id);
      newWordState.optional = resp.userWord.optional;
      if (card.classList.contains('learned')) {
        card.classList.remove('hard');
        newWordState.optional.isLearned = true;
        newWordState.difficulty = 'easy';
      } else newWordState.optional.isLearned = false;
      this.updateOrDelete(newWordState);
    } else {
      if (card.classList.contains('learned')) newWordState.optional.isLearned = true;
      this.isUserWord = true;
      createUserWord(state.userId, state.accessToken, this.word.id, newWordState);
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
