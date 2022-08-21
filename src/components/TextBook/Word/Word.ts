import './img/sound.svg';

interface WordData {
  audio: string,
  audioExample: string,
  audioMeaning: string,
  group: number,
  id: string,
  image: string,
  page: number,
  textExample: string,
  textExampleTranslate: string,
  textMeaning: string,
  textMeaningTranslate: string,
  transcription: string,
  word: string,
  wordTranslate: string,
}

class Word {
  word: WordData;

  base: string;

  template: string;

  constructor(word: WordData) {
    this.word = word;
    this.base = 'https://rslang142-learnwords.herokuapp.com/';
    this.template = `
      <button class="textbook__word-sound-btn">
        <img class="textbook__word-sound-btn-image" src="./img/sound.svg" alt="sound icon">
      </button>
      <img class="textbook__word-img" alt="word picture">
      <div class="textbook__word-wrapper">
        <p class="textbook__word"></p>
        <p class="textbook__transcription"></p>
        <p class="textbook__word-translation"></p>
      </div>
      <div class="textbook__definition-wrapper">
        <p class="textbook__definition"></p>
        <p class="textbook__definition-translation"></p></p>
      </div>
      <div class="textbook__example-wrapper">
        <p class="textbook__example"></p>
        <p class="textbook__example-translation"></p></p>
      </div>`;
  }

  createCard() {
    const card = document.createElement('div');
    card.classList.add('textbook__word');
    card.innerHTML = this.template;

    return card;
  }

  render() {
    const card = this.createCard();
    const img = card.querySelector('.textbook__word-img') as HTMLImageElement;
    const word = card.querySelector('.textbook__word') as HTMLParagraphElement;
    const transcription = card.querySelector('.textbook__transcription') as HTMLParagraphElement;
    const wordTranslation = card.querySelector('.textbook__word-translation') as HTMLParagraphElement;
    const definition = card.querySelector('.textbook__definition') as HTMLParagraphElement;
    const definitionTranslation = card.querySelector('.textbook__definition-translation') as HTMLParagraphElement;
    const example = card.querySelector('.textbook__example') as HTMLParagraphElement;
    const exampleTranslation = card.querySelector('.textbook__example-translation') as HTMLParagraphElement;
    const soundBtn = card.querySelector('.textbook__word-sound-btn') as HTMLButtonElement;

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

    return card;
  }
}

export { Word, WordData };
