import { USERS_URL } from './urlApi';
import StatusCode from './statusCode';
import { IWord, IWordsResp } from './wordsApi';

export interface IWordsParams {
  group?: number;
  page?: number;
  wordsPerPage?: number;
  filter?: string;
}

interface IAggregatedWordsResp {
  paginatedResults: Array<IWord>;
  totalCount: Array<{ count: number }>;
}

export const GET_EASY = '{"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}';
export const GET_EASY_LEARNED = '{"$and":[{"userWord.difficulty":"easy"},{"userWord.optional.isLearned":true}]}';
export const GET_HARD = '{"userWord.difficulty":"hard"}';
export const GET_UNLEARNED_HARD = '{"$and":[{"userWord.difficulty":"hard"},{"$or":[{"userWord.optional.isLearned":null},{"userWord.optional.isLearned":false}]}]}';

export const getUserAggregatedWords = async (
  userId: string,
  token: string,
  params: IWordsParams,
): Promise<IWordsResp> => {
  const group = params.group === undefined ? '' : `${params.group}`;
  const page = params.page === undefined ? '' : `${params.page}`;
  const wordsPerPage = params.wordsPerPage === undefined ? '' : `${params.wordsPerPage}`;
  const filter = params.filter === undefined ? '' : params.filter;
  const resp = await fetch(
    `${USERS_URL}/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );

  const wordsResp : IWordsResp = {
    isSuccess: false,
    words: [],
    totalCount: 0,
    errMsg: '',
  };

  if (resp.status === StatusCode.OK) {
    const data = await resp.json() as Array<IAggregatedWordsResp>;

    wordsResp.isSuccess = true;
    Object.assign(wordsResp.words, data[0].paginatedResults);
    wordsResp.totalCount = data[0].totalCount[0] ? data[0].totalCount[0].count : 0;
  } else {
    wordsResp.errMsg = await resp.text();
  }

  return wordsResp;
};
