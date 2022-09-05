enum ScreenStates {
  Home = 'home',
  Textbook = 'book',
  Game = 'game',
  Stats = 'stats',
  Team = 'team',
  Login = 'login',
}

interface IState {
  userId: string;
  refreshTime: number;
  accessToken: string;
  isUserLogged: boolean;
  screen: ScreenStates;

  setScreen: (screen: ScreenStates) => void;
}

const state: IState = {
  userId: '',
  accessToken: '',
  isUserLogged: false,
  refreshTime: 1.26e+7, // 3.5 hours
  screen: ScreenStates.Home,

  setScreen(screen) {
    this.screen = screen;
    localStorage.setItem('screen', screen);
  },
};

export default state;
