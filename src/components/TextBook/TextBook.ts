import './textbook.css';
import Word from './Word/Word';
import { getWords } from '../Api/wordsApi';

interface ITextBook {
  create: () => HTMLDivElement;
}

const Textbook: ITextBook = {
  create() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('textbook');

    async function getWordsArray() {
      const response = await getWords(0, 0);
      response.words.forEach((wordData) => {
        const word = new Word(wordData).render();
        wrapper.append(word);
      });
    }

    getWordsArray();
    // append textbook to screen (when screen if ready)

    return wrapper;
  },
};

export default Textbook;
