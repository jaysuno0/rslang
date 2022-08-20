import BASE_URL from './urlApi';

const WORDS_URL = `${BASE_URL}/words`;
const OK = 200;

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IWordsResp {
  isSuccess: boolean;
  words: Array<IWord>;
  errMsg: string;
}

export interface IWordResp {
  isSuccess: boolean;
  word: IWord;
  errMsg: string;
}

export const getWords = async (group: number, page: number): Promise<IWordsResp> => {
  const resp = await fetch(`${WORDS_URL}?group=${group}&page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const wordsResp : IWordsResp = {
    isSuccess: false,
    words: [],
    errMsg: '',
  };

  if (resp.status === OK) {
    const data = (await resp.json()) as Array<IWord>;

    wordsResp.isSuccess = true;
    Object.assign(wordsResp.words, data);
  } else {
    wordsResp.errMsg = await resp.text();
  }

  return wordsResp;
};

export const getWord = async (wordId: string): Promise<IWordResp> => {
  const resp = await fetch(`${WORDS_URL}/${wordId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const wordResp : IWordResp = {
    isSuccess: false,
    word: {
      id: '',
      group: 0,
      page: 0,
      word: '',
      image: '',
      audio: '',
      audioMeaning: '',
      audioExample: '',
      textMeaning: '',
      textExample: '',
      transcription: '',
      wordTranslate: '',
      textMeaningTranslate: '',
      textExampleTranslate: '',
    },
    errMsg: '',
  };

  if (resp.status === OK) {
    const data = (await resp.json()) as IWord;

    wordResp.isSuccess = true;
    Object.assign(wordResp.word, data);
  } else {
    wordResp.errMsg = await resp.text();
  }

  return wordResp;
};
