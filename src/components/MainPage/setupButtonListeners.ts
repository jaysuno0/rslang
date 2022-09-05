/* eslint-disable import/no-cycle */
import { clearGameInterval } from '../Game/GameSprint/LevelSelect/sprintSelectInit';
import { footerShow } from '../Game/footerHidden';

export enum ButtonActionTypes {
  Home = 'home',
  Textbook = 'book',
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
    footerShow();
    clearGameInterval();
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
    footerShow();
    clearGameInterval();
    const eTarget = e.target as Element;
    const headerElem = (eTarget.closest(`.${HEADER_ITEM_CLASS}`));
    if (headerElem?.id) {
      actions[headerElem.id as ButtonActionTypes]();
    }
  });
}
export default setupButtonListeners;
