export enum NavigationActionTypes {
  Home = 'home',
  Book = 'book',
  Game = 'game',
  Stats = 'stats',
  Team = 'team'
}
type NavigationActions = { [key in NavigationActionTypes]: () => void }

function setupNavListeners(actions: NavigationActions) {
  const NAV_ITEM_CLASS = 'nav__item';
  const DIV_NAV_ID = 'nav';
  const nav = document.getElementById(DIV_NAV_ID);
  nav?.addEventListener('click', (e) => {
    const eTarget = e.target as Element;
    const navElem = (eTarget.closest(`.${NAV_ITEM_CLASS}`));
    if (navElem?.id) {
      actions[navElem.id as NavigationActionTypes]();
    }
  });
}
export default setupNavListeners;
