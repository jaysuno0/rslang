interface IState {
  userId: string;
  refreshTime: number;
  accessToken: string;
  isUserLogged: boolean;
}

const state: IState = {
  userId: '',
  accessToken: '',
  isUserLogged: false,
  refreshTime: 1.26e+7, // 3.5 hours
};

export default state;
