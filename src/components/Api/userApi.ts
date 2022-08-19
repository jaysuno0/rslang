import BASE_URL from './urlApi';

const USERS_URL = `${BASE_URL}/users`;
const OK = 200;

export interface IUserLogin {
  name?: string;
  email: string;
  password: string;
}

export interface IUser {
  name?: string;
  email: string;
  id: string;
}

export interface IUserResp {
  isSuccess: boolean;
  user: IUser;
  errMsg: string;
}

export const createUser = async (newUser: IUserLogin): Promise<IUserResp> => {
  const resp = await fetch(USERS_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  const userResp : IUserResp = {
    isSuccess: false,
    user: {
      email: '',
      id: '',
    },
    errMsg: '',
  };

  if (resp.status === OK) {
    const data = await resp.json() as IUser;

    userResp.isSuccess = true;
    Object.assign(userResp.user, data);
  } else {
    userResp.errMsg = await resp.text();
  }

  return userResp;
};
