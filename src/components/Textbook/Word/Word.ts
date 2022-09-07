import './word.css';
import '../img/sound.svg';
import '../img/hard-gold.svg';
import '../img/hard.svg';
import '../img/learned.svg';
import '../img/stats.svg';
import '../img/close.svg';
import state from '../../../state';
import { IWord } from '../../Api/wordsApi';
import {
  createUserWord,
  IWordProps,
  updateUserWord,
} from '../../Api/userWordsApi';
import textbookState from '../textbookState';
import { getUserAggregatedWords, GET_HARD, IWordsParams } from '../../Api/userAggregatedWords';

class Word {
  word: IWord;

  isUserWord: boolean;

  base: string;

  template: string;

  card: HTMLDivElement;

  constructor(word: IWord) {
    this.isUserWord = false;
    this.word = word;
    this.base = 'https://rslang142-learnwords.herokuapp.com/';
    this.template = `
    <button class="card__btn card__btn_stats btn-stats hidden" title="посмотреть статистику">
        <img class="card__sound-btn-image btn-stats" src="./img/stats.svg" alt="stats icon">
      </button>
      <button class="card__btn card__btn_sound btn-sound" title="воспроизвести аудио">
        <img class="card__sound-btn-image btn-sound" src="./img/sound.svg" alt="sound icon">
      </button>
      <button class="card__btn card__btn_hard btn-hard hidden" title="добавить в список сложных">
        <img class="card__btn-image btn-hard" src="./img/hard-gold.svg" alt="sound icon">
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
      </div>
      <div class="card__stats hidden">
        <button class="card__btn card__btn_close btn-close">
          <img class="card__btn-image btn-close" src="./img/close.svg" alt="close icon">
        </button>
        <div class="card__stats-wrapper">
          <p class="card__stats-title">Спринт</p>
          <div class="card__stats-game card__stats-game_sprint">
            <p class="card__stats-answer card__stats-answer_right sprint-right">20</p>
            <p class="card__stats-answer card__stats-answer_wrong sprint-wrong">30</p>
          </div>
        </div>
        <div class="card__stats-wrapper">
          <p class="card__stats-title">Аудиовызов</p>
          <div class="card__stats-game card__stats-game_audiocall">
            <p class="card__stats-answer card__stats-answer_right audiocall-right">5</p>
            <p class="card__stats-answer card__stats-answer_wrong audiocall-wrong">16</p>
          </div>
        </div>
        <p class="card__new-word-text hidden">Это ваше новое слово :)</p>
      </div>
      `;
    this.setIsUserWord();
    this.card = this.createCard();
    this.render();
    this.createStats();
  }

  createCard() {
    const card = document.createElement('div');
    card.classList.add('textbook__card', 'card');
    card.innerHTML = this.template;

    return card;
  }

  render() {
    const { card } = this;
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
  }

  activateSound() {
    const audioWord = new Audio(`${this.base}${this.word.audio}`);
    const audioMeaning = new Audio(`${this.base}${this.word.audioMeaning}`);
    const audioExample = new Audio(`${this.base}${this.word.audioExample}`);

    audioWord.play();
    audioWord.onended = () => audioMeaning.play();
    audioMeaning.onended = () => audioExample.play();
  }

  setIsUserWord() {
    if (this.word.userWord) this.isUserWord = true;
  }

  async setWord(props: IWordProps) {
    const { word } = this;
    if (this.isUserWord) {
      const newProps = { ...props };
      newProps.difficulty = props.difficulty;
      if (this.word.userWord) newProps.optional = this.word.userWord.optional;
      newProps.optional.isLearned = props.optional.isLearned;
      updateUserWord(state.userId, state.accessToken, word.id, newProps);
    } else {
      createUserWord(state.userId, state.accessToken, word.id, props);
      this.isUserWord = true;
    }
  }

  setCardState(card: HTMLDivElement) {
    if (this.word.userWord?.difficulty === 'hard') {
      card.classList.add('hard');
      this.isUserWord = true;
    } else if (this.word.userWord?.optional.isLearned) {
      card.classList.add('learned');
      textbookState.addLearnedWord();
      this.isUserWord = true;
    }
  }

  addCardToPage() {
    const cardsWrapper = document.querySelector('.textbook__cards-wrapper') as HTMLDivElement;
    if (state.isUserLogged) this.setCardState(this.card);
    cardsWrapper.append(this.card);
  }

  async replaceHardWord() {
    const params: IWordsParams = {
      wordsPerPage: 1,
      page: textbookState.currentPage + 1,
      filter: GET_HARD,
    };

    const response = await getUserAggregatedWords(state.userId, state.accessToken, params);
    if (response.isSuccess && this.isUserWord) {
      const word = new Word(response.words[0]);
      word.addCardToPage();
    }
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
      if (card.classList.contains('learned')) {
        card.classList.remove('learned');
        textbookState.deleteLearnedWord();
      }
    } else wordProps.difficulty = 'easy';
    this.setWord(wordProps);
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
      card.classList.remove('hard');
      wordProps.optional.isLearned = true;
      textbookState.addLearnedWord();
    } else {
      wordProps.optional.isLearned = false;
      textbookState.deleteLearnedWord();
    }
    this.setWord(wordProps);

    if (textbookState.currentGroup === textbookState.hardLevelNumber) {
      card.remove();
      if (textbookState.hardWordsCount >= textbookState.wordsPerPage
      && textbookState.currentPage !== textbookState.lastPage) this.replaceHardWord();
      textbookState.deleteHardWord();
    }
  }

  createStats() {
    const sprintRightElement = this.card.querySelector('.sprint-right') as HTMLParagraphElement;
    const sprintWrongElement = this.card.querySelector('.sprint-wrong') as HTMLParagraphElement;
    const audiocallRightElement = this.card.querySelector('.audiocall-right') as HTMLParagraphElement;
    const audiocallWrongElement = this.card.querySelector('.audiocall-wrong') as HTMLParagraphElement;
    const newWordElement = this.card.querySelector('.card__new-word-text') as HTMLParagraphElement;
    const sprintRightAnswer = this.word.userWord?.optional.sprintAnswers?.right;
    const sprintWrongAnswer = this.word.userWord?.optional.sprintAnswers?.wrong;
    const audiocallRightAnswer = this.word.userWord?.optional.audiocallAnswers?.right;
    const audiocallWrongAnswer = this.word.userWord?.optional.audiocallAnswers?.wrong;
    let gamesCount = 0;

    function setStat(element: HTMLParagraphElement, content = 0) {
      const gameStatDigits = element;
      gameStatDigits.textContent = `${content}`;
      gamesCount += content;
    }

    setStat(sprintRightElement, sprintRightAnswer);
    setStat(sprintWrongElement, sprintWrongAnswer);
    setStat(audiocallRightElement, audiocallRightAnswer);
    setStat(audiocallWrongElement, audiocallWrongAnswer);

    if (gamesCount === 1) newWordElement.classList.remove('hidden');
  }

  toggleStats() {
    const statsHolder = this.card.querySelector('.card__stats') as HTMLDivElement;
    statsHolder.classList.toggle('hidden');
  }

  activateButtons(card: HTMLDivElement) {
    const hardBtn = card.querySelector('.btn-hard') as HTMLButtonElement;
    const learnedBtn = card.querySelector('.btn-learned') as HTMLButtonElement;
    const statsBtn = card.querySelector('.btn-stats') as HTMLButtonElement;

    if (state.isUserLogged) {
      hardBtn.classList.remove('hidden');
      learnedBtn.classList.remove('hidden');
      statsBtn.classList.remove('hidden');
    }

    card.addEventListener('click', (event) => {
      const btn = event.target as HTMLElement;
      if (btn.classList.contains('btn-sound')) {
        this.activateSound();
      } else if (btn.classList.contains('btn-hard')) {
        this.toggleHard(card);
      } else if (btn.classList.contains('btn-learned')) {
        this.toggleLearned(card);
      } else if (btn.classList.contains('btn-stats')) {
        this.toggleStats();
      } else if (btn.classList.contains('btn-close')) {
        this.toggleStats();
      }
    });
  }
}

export default Word;
