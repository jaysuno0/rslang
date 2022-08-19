import BASE_URL from './urlApi';
import { IUserLogin } from './userApi';

const LOGIN_URL = `${BASE_URL}/signin`;
const OK = 200;

export interface ITokenResp {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name?: string;
}

export interface ILoginResp {
  isSuccess: boolean;
  tokenResp: ITokenResp;
  errMsg: string;
}

export const loginUser = async (user: IUserLogin): Promise<ILoginResp> => {
  const resp = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const loginResp : ILoginResp = {
    isSuccess: false,
    tokenResp: {
      message: '',
      token: '',
      refreshToken: '',
      userId: '',
    },
    errMsg: '',
  };

  if (resp.status === OK) {
    const data = await resp.json() as ITokenResp;

    loginResp.isSuccess = true;
    Object.assign(loginResp.tokenResp, data);
  } else {
    loginResp.errMsg = await resp.text();
  }

  return loginResp;
};
