import './audiocallGame.css';
import { renderIntro } from './render';
import { setStartButtonHandler } from './events';
import { footerHidden } from '../footerHidden';
import store from './gameStore';

const OUTPUT_AREA_SELECTOR = '.screen';

const showIntro = (isDisabledLevelSelection: boolean, group:number, page:number) => {
  renderIntro(store.appOutput, isDisabledLevelSelection, group);
  setStartButtonHandler(isDisabledLevelSelection, group, page);
};

const audiocallStart = (isStartedFromTextbook = false, group = 1, page = 1) => {
  const screen = document.querySelector(OUTPUT_AREA_SELECTOR);
  if (!screen) throw new Error('Error in HTML');

  footerHidden();
  screen.innerHTML = '';
  screen.append(store.appOutput);
  showIntro(isStartedFromTextbook, group, page);
};

export default audiocallStart;
