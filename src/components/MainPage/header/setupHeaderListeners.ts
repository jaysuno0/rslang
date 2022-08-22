import { ButtonActionTypes, ButtonActions } from '../setupButtonListeners';

function setupHeaderListeners(actions: ButtonActions) {
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
}
export default setupHeaderListeners;
