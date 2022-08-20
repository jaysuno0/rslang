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
