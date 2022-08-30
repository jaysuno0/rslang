import './header/header.css';
import './navigation/navigation.css';
import './homePage/homePage.css';
import './aboutTeamPage/aboutTeam.css';
import './footer/footer.css';
import './reset.css';
import './hoverStyle.css';
import '../Game/gameSelect/gameSelect.css';
import HeaderRender from './header/header';
import NavRender from './navigation/navigation';
import Screen from '../Screen/Screen';
import HomePageRender from './homePage/homePage';
import AboutTeamRender from './aboutTeamPage/aboutTeam';
import FooterRender from './footer/footer';
import setupButtonListeners, { ButtonActionTypes } from './setupButtonListeners';
import Textbook from '../Textbook/Textbook';
import { Authorization } from '../Authorization/Authorization';
import GameSelect from '../Game/gameSelect/gameSelect';
import state from '../../state';

const header = new HeaderRender();
const nav = new NavRender();
const homePage = new HomePageRender();
const aboutTeam = new AboutTeamRender();
const footer = new FooterRender();
const gameSelect = new GameSelect();

header.render();
nav.render();
Screen.create();
homePage.render();
footer.render();

setupButtonListeners({
  [ButtonActionTypes.Home]: () => {
    homePage.create();
    state.setScreen(ButtonActionTypes.Home);
  },

  [ButtonActionTypes.Textbook]: () => {
    Textbook.create();
    state.setScreen(ButtonActionTypes.Textbook);
  },

  [ButtonActionTypes.Game]: () => {
    gameSelect.create();
    state.setScreen(ButtonActionTypes.Game);
  },

  [ButtonActionTypes.Stats]: () => {
    console.log('Stats Callback');
    state.setScreen(ButtonActionTypes.Stats);
  },

  [ButtonActionTypes.Team]: () => {
    aboutTeam.create();
    state.setScreen(ButtonActionTypes.Team);
  },

  [ButtonActionTypes.Login]: () => {
    Authorization.create();
    state.setScreen(ButtonActionTypes.Login);
  },
});
