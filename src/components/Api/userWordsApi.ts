import { USERS_URL } from './urlApi';
import StatusCode from './statusCode';

export interface IResp {
  isSuccess: boolean;
  errMsg: string;
}

export interface IWordProps {
  difficulty: string;
  optional: {
    isLearned?: boolean,
    sprintAnswers?: {
      right: number,
      wrong: number,
    },
    audiocallAnswers?: {
      right: number,
      wrong: number,
    },
    rightAnswersInRow?: number,
  };
}

export interface IUserWord extends IWordProps {
  id: string;
  wordId: string;
}

export interface IUserWordsResp {
  isSuccess: boolean;
  userWords: Array<IUserWord>;
  errMsg: string;
}

export interface IUserWordResp {
  isSuccess: boolean;
  userWord: IUserWord;
  errMsg: string;
}

export const createUserWord = async (
  userId: string,
  token: string,
  wordId: string,
  wordProps: IWordProps,
): Promise<IResp> => {
  const resp = await fetch(`${USERS_URL}/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordProps),
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

export const updateUserWord = async (
  userId: string,
  token: string,
  wordId: string,
  wordProps: IWordProps,
): Promise<IResp> => {
  const resp = await fetch(`${USERS_URL}/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordProps),
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

export const deleteUserWord = async (
  userId: string,
  token: string,
  wordId: string,
): Promise<IResp> => {
  const resp = await fetch(`${USERS_URL}/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result : IResp = {
    isSuccess: false,
    errMsg: '',
  };

  if (resp.status === StatusCode.NO_CONTENT) {
    result.isSuccess = true;
  } else {
    result.errMsg = await resp.text();
  }

  return result;
};

export const getUserWords = async (userId: string, token: string): Promise<IUserWordsResp> => {
  const resp = await fetch(`${USERS_URL}/${userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const userWordsResp : IUserWordsResp = {
    isSuccess: false,
    userWords: [],
    errMsg: '',
  };

  if (resp.status === StatusCode.OK) {
    const data = (await resp.json()) as Array<IUserWord>;

    userWordsResp.isSuccess = true;
    Object.assign(userWordsResp.userWords, data);
  } else {
    userWordsResp.errMsg = await resp.text();
  }

  return userWordsResp;
};

export const getUserWord = async (
  userId: string,
  token: string,
  wordId: string,
): Promise<IUserWordResp> => {
  const resp = await fetch(`${USERS_URL}/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const userWordResp : IUserWordResp = {
    isSuccess: false,
    userWord: {
      id: '',
      wordId: '',
      difficulty: '',
      optional: {},
    },
    errMsg: '',
  };

  if (resp.status === StatusCode.OK) {
    const data = (await resp.json()) as IUserWord;

    userWordResp.isSuccess = true;
    Object.assign(userWordResp.userWord, data);
  } else {
    userWordResp.errMsg = await resp.text();    
  }

  return userWordResp;
};
