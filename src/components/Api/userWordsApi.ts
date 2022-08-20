import { USERS_URL } from './userApi';

const OK = 200;
const OK_DEL = 204;

export interface IResp {
  isSuccess: boolean;
  errMsg: string;
}

export interface IWordProps {
  difficulty: string;
  optional: {
    isLearned?: boolean,
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

  if (resp.status === OK) {
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

  if (resp.status === OK) {
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

  if (resp.status === OK_DEL) {
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

  if (resp.status === OK) {
    const data = (await resp.json()) as Array<IUserWord>;

    userWordsResp.isSuccess = true;
    Object.assign(userWordsResp.userWords, data);
  } else {
    userWordsResp.errMsg = await resp.text();
  }

  return userWordsResp;
};
