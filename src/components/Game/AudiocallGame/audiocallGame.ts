import './audiocallGame.css';
import { renderIntro } from './render';

const OUTPUT_AREA_SELECTOR = '.screen';
const appOutput = document.createElement('div');

const showIntro = (isDisabledLevelSelection: boolean, group:number, page:number) => {
  renderIntro(appOutput, isDisabledLevelSelection, group);
  console.log(page);
  // setStartButtonHandler(startGame);
};

export const audiocallStart = (isStartedFromTextbook = false, group = 1, page = 1) => {
  const screen = document.querySelector(OUTPUT_AREA_SELECTOR);
  if(!screen) throw new Error('Error in HTML');

  appOutput.classList.add('acg__output');
  screen.innerHTML = '' ;
  screen.append(appOutput);
  showIntro(isStartedFromTextbook, group, page);
};
