import './header/header.css';
import './navigation/navigation.css';
import './screen/screen.css';
import './homePage/homePage.css';
import './aboutTeamPage/aboutTeam.css';
import './footer/footer.css';
import './reset.css';
import './hoverStyle.css';
import '../Game/gameSelect/gameSelect.css';
import HeaderRender from './header/header';
import NavRender from './navigation/navigation';
import screenRender from './screen/screen';
import HomePageRender from './homePage/homePage';
import aboutTeamRender from './aboutTeamPage/aboutTeam';
import FooterRender from './footer/footer';
import setupButtonListeners, { ButtonActionTypes } from './setupButtonListeners';
import Textbook from '../Textbook/Textbook';
import GameSelect from '../Game/gameSelect/gameSelect';

const header = new HeaderRender();
const nav = new NavRender();
const homePage = new HomePageRender();
const aboutTeam = new aboutTeamRender();
const footer = new FooterRender();
const gameSelect = new GameSelect();

header.render();
nav.render();
screenRender();
homePage.render();
footer.render();

setupButtonListeners({
  [ButtonActionTypes.Home]: () => homePage.create(),
  [ButtonActionTypes.Book]: () => Textbook.create(),
  [ButtonActionTypes.Game]: () => gameSelect.create(),
  [ButtonActionTypes.Stats]: () => { console.log('Stats Callback'); },
  [ButtonActionTypes.Team]: () => aboutTeam.create(),
  [ButtonActionTypes.Login]: () => { console.log('Login Callback'); },
});
