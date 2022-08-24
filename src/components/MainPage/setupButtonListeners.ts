export enum ButtonActionTypes {
  Home = 'home',
  Book = 'book',
  Game = 'game',
  Stats = 'stats',
  Team = 'team',
  Login = 'login',
}
export type ButtonActions = { [key in ButtonActionTypes]: () => void };

function setupButtonListeners(actions: ButtonActions) {
  const NAV_ITEM_CLASS = 'nav__item';
  const DIV_NAV_ID = 'nav';
  const nav = document.getElementById(DIV_NAV_ID);
  nav?.addEventListener('click', (e) => {
    const eTarget = e.target as Element;
    const navElem = (eTarget.closest(`.${NAV_ITEM_CLASS}`));
    if (navElem?.id) {
      actions[navElem.id as ButtonActionTypes]();
    }
  });

  const HEADER_ITEM_CLASS = 'header__button';
  const DIV_HEADER_ID = 'header';
  const header = document.getElementById(DIV_HEADER_ID);
  header?.addEventListener('click', (e) => {
    const eTarget = e.target as Element;
    const headerElem = (eTarget.closest(`.${HEADER_ITEM_CLASS}`));
    if (headerElem?.id) {
      actions[headerElem.id as ButtonActionTypes]();
    }
  });

  const HOME_PAGE_ITEM_CLASS = 'homePage__button';
  const DIV_HOME_PAGE_ID = 'homePage';
  const homePage = document.getElementById(DIV_HOME_PAGE_ID);
  homePage?.addEventListener('click', (e) => {
    const eTarget = e.target as Element;
    const homePageElem = (eTarget.closest(`.${HOME_PAGE_ITEM_CLASS}`));
    if (homePageElem?.id) {
      actions[homePageElem.id as ButtonActionTypes]();
    }
  });
}
export default setupButtonListeners;
