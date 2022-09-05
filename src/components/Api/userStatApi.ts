import { USERS_URL } from './urlApi';
import StatusCode from './statusCode';
import { IResp } from './userWordsApi';

export interface IGameStat {
  right: number,
  wrong: number,
  gamesCount: number,
  newWords: number,
}

export interface IDayStat {
  date: string; // "YY-MM-DD"
  sprint: IGameStat;
  audiocall: IGameStat;
}

export interface IUserStat {
  learnedWords: number;
  optional: {
    daily: {
      day: Array<IDayStat>
    },
  };
}

export interface IUserStatResp {
  isSuccess: boolean;
  stat: IUserStat;
  errMsg: string;
}

export const upsertUserStat = async (
  userId: string,
  token: string,
  stat: IUserStat,
): Promise<IResp> => {
  const resp = await fetch(`${USERS_URL}/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stat),
  });
  const result : IResp = {
    isSuccess: false,
    errMsg: '',
  };

  if (resp.status === StatusCode.OK) {
    result.isSuccess = true;
  } else {
    result.errMsg = await resp.text();
  }

  return result;
};
