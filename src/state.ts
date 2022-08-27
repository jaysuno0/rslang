interface IState {
  refreshTime: number;
  accessToken: string;
  isUserLogged: boolean;
}

const state: IState = {
  refreshTime: 1.26e+7, // 3.5 hours
  isUserLogged: false,
  accessToken: '',
};

export default state;
