import './header/header.css';
import './navigation/navigation.css';
import './screen/screen.css';
import './homePage/homePage.css';
import './footer/footer.css';
import './reset.css';
import './hoverStyle.css';
import './gameSelect/gameSelect.css';
import HeaderRender from './header/header';
import NavRender from './navigation/navigation';
import screenRender from './screen/screen';
import HomePageRender from './homePage/homePage';
import FooterRender from './footer/footer';
import setupButtonListeners, { ButtonActionTypes } from './setupButtonListeners';
import GameSelect from './gameSelect/gameSelect';

const header = new HeaderRender();
const nav = new NavRender();
const homePage = new HomePageRender();
const footer = new FooterRender();
const gameSelect = new GameSelect();

header.render();
nav.render();
screenRender();
homePage.render();
footer.render();

setupButtonListeners({
  [ButtonActionTypes.Home]: () => { console.log('Home Callback'); },
  [ButtonActionTypes.Book]: () => { console.log('Book Callback'); },
  [ButtonActionTypes.Game]: () => gameSelect.create(),
  [ButtonActionTypes.Stats]: () => { console.log('Stats Callback'); },
  [ButtonActionTypes.Team]: () => { console.log('Team Callback'); },
  [ButtonActionTypes.Login]: () => { console.log('Login Callback'); },
});
