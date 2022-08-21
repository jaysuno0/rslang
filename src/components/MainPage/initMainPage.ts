import './header/header.css';
import './navigation/navigation.css';
import './screen/screen.css';
import './homePage/homePage.css';
import './footer/footer.css';
import './reset.css';
import HeaderRender from './header/header';
import NavRender from './navigation/navigation';
import screenRender from './screen/screen';
import HomePageRender from './homePage/homePage';
import FooterRender from './footer/footer';
import setupNavListeners, { NavigationActionTypes } from './navigation/setupNavListeners';

const header = new HeaderRender();
const nav = new NavRender();
const homePage = new HomePageRender();
const footer = new FooterRender();

header.render();
nav.render();
screenRender();
homePage.render();
footer.render();

setupNavListeners({
  [NavigationActionTypes.Home]: () => { console.log('Home Callback'); },
  [NavigationActionTypes.Book]: () => { console.log('Book Callback'); },
  [NavigationActionTypes.Game]: () => { console.log('Game Callback'); },
  [NavigationActionTypes.Stats]: () => { console.log('Stats Callback'); },
  [NavigationActionTypes.Team]: () => { console.log('Team Callback'); },
});
