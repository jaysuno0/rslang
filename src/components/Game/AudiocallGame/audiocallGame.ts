import './audiocallGame.css';
import { renderIntro } from './render';
import { setStartButtonHandler } from './events';
import { footerHidden } from '../footerHidden';

const OUTPUT_AREA_SELECTOR = '.screen';
export const appOutput = document.createElement('div');

const showIntro = (isDisabledLevelSelection: boolean, group:number, page:number) => {
  renderIntro(appOutput, isDisabledLevelSelection, group);
  setStartButtonHandler(isDisabledLevelSelection, group, page);
};

const audiocallStart = (isStartedFromTextbook = false, group = 1, page = 1) => {
  const screen = document.querySelector(OUTPUT_AREA_SELECTOR);
  if (!screen) throw new Error('Error in HTML');

  footerHidden();
  appOutput.classList.add('acg__output');
  screen.innerHTML = '';
  screen.append(appOutput);
  showIntro(isStartedFromTextbook, group, page);
};

export default audiocallStart;
