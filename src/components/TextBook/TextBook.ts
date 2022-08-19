interface ITextBook {
  getWords: (group: number, page: number) => void;
}

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

const TextBook: ITextBook = {
  getWords(group = 0, page = 0) {
    const wordsPromise = fetch(`https://rslang142-learnwords.herokuapp.com/words?group=${group}&page=${page}`);

    wordsPromise
      .then((response) => response.json())
      .then((data: WordData) => data)
      .catch((err) => console.error(err));
  },
};

export default TextBook;
