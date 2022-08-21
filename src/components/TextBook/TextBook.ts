import './textbook.css';
import { Word, WordData } from './Word/Word';

interface ITextBook {
  render: () => HTMLDivElement;
  getWords: (group: number, page: number) => void;
}

const TextBook: ITextBook = {
  render() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('textbook');

    // change when screen main page is ready
    document.body.append(wrapper);
    return wrapper;
  },

  getWords(group = 0, page = 0) {
    const textbook = this.render();

    const wordsPromise = fetch(`https://rslang142-learnwords.herokuapp.com/words?group=${group}&page=${page}`);
    wordsPromise
      .then((response) => response.json())
      .then((data: WordData[]) => {
        data.forEach((wordData) => {
          const word = new Word(wordData).render();
          textbook.append(word);
        });
      })
      .catch((err) => console.error(err));
  },
};

export default TextBook;
