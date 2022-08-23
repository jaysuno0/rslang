import './header/header.css';
import './navigation/navigation.css';
import './screen/screen.css';
import './homePage/homePage.css';
import './aboutTeamPage/aboutTeam.css';
import './footer/footer.css';
import './reset.css';
import './hoverStyle.css';
import HeaderRender from './header/header';
import NavRender from './navigation/navigation';
import screenRender from './screen/screen';
import HomePageRender from './homePage/homePage';
import aboutTeamRender from './aboutTeamPage/aboutTeam';
import FooterRender from './footer/footer';
import setupButtonListeners, { ButtonActionTypes } from './setupButtonListeners';

const header = new HeaderRender();
const nav = new NavRender();
const homePage = new HomePageRender();
const aboutTeam = new aboutTeamRender();
const footer = new FooterRender();

header.render();
nav.render();
screenRender();
homePage.render();
footer.render();

setupButtonListeners({
  [ButtonActionTypes.Home]: () => homePage.create(),
  [ButtonActionTypes.Book]: () => { console.log('Book Callback'); },
  [ButtonActionTypes.Game]: () => { console.log('Game Callback'); },
  [ButtonActionTypes.Stats]: () => { console.log('Stats Callback'); },
  [ButtonActionTypes.Team]: () => aboutTeam.create(),
  [ButtonActionTypes.Login]: () => { console.log('Login Callback'); },
});
