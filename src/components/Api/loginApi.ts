import { LOGIN_URL } from './urlApi';
import { IUserLogin, ILoginResp, ITokenResp } from './userApi';
import StatusCode from './statusCode';

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

  if (resp.status === StatusCode.OK) {
    const data = (await resp.json()) as ITokenResp;

    loginResp.isSuccess = true;
    Object.assign(loginResp.tokenResp, data);
  } else {
    loginResp.errMsg = await resp.text();
  }

  return loginResp;
};

export default loginUser;
