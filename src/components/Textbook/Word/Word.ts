import './word.css';
import '../img/sound.svg';
import '../img/hard.svg';
import { IWord } from '../../Api/wordsApi';

class Word {
  word: IWord;

  base: string;

  template: string;

  constructor(word: IWord) {
    this.word = word;
    this.base = 'https://rslang142-learnwords.herokuapp.com/';
    this.template = `
      <button class="card__btn card__btn_sound">
        <img class="card__sound-btn-image" src="./img/sound.svg" alt="sound icon">
      </button>
      <button class="card__btn card__btn_hard">
        <img class="card__btn-image" src="./img/hard.svg" alt="sound icon">
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
    const soundBtn = card.querySelector('.card__btn_sound') as HTMLButtonElement;

    img.setAttribute('src', this.base + this.word.image);
    word.textContent = this.word.word;
    transcription.textContent = this.word.transcription;
    wordTranslation.textContent = this.word.wordTranslate;
    definition.innerHTML = this.word.textMeaning;
    definitionTranslation.textContent = this.word.textMeaningTranslate;
    example.innerHTML = this.word.textExample;
    exampleTranslation.textContent = this.word.textExampleTranslate;

    soundBtn.addEventListener('click', () => {
      const audioWord = new Audio(`${this.base}${this.word.audio}`);
      const audioMeaning = new Audio(`${this.base}${this.word.audioMeaning}`);
      const audioExample = new Audio(`${this.base}${this.word.audioExample}`);

      audioWord.play();
      audioWord.onended = () => audioMeaning.play();
      audioMeaning.onended = () => audioExample.play();
    });

    // DELETE
    card.classList.add('hard');

    return card;
  }
}

export default Word;
