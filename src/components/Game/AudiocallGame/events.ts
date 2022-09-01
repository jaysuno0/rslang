import { startGame } from './gameStart';

let startBtn: HTMLButtonElement;

const startKeyHandler = (e: KeyboardEvent) => {
  if (e.code === 'Enter') {
    startBtn.click();
  }
};

export const setStartButtonHandler = (
  isDisabledLevelSelection: boolean,
  group:number,
  page:number,
) => {
  startBtn = document.querySelector('.output__start-btn') as HTMLButtonElement;
  const levelSelector = document.querySelector('.output__level') as HTMLSelectElement;
  if (!startBtn || !levelSelector) throw new Error('Error in HTML');

  startBtn.addEventListener('click', () => {
    document.removeEventListener('keyup', startKeyHandler);
    const level = isDisabledLevelSelection ? page : parseInt(levelSelector.value, 10);
    if (Number.isNaN(level)) throw new Error('Error in HTML');
    startGame(isDisabledLevelSelection, level, page);
  });

  document.addEventListener('keyup', startKeyHandler);
};
