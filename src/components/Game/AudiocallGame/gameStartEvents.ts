import { startGame } from './gameStart';

const startKeyHandler = (event: KeyboardEvent) => {
  const startBtn = document.querySelector('.output__start-btn') as HTMLButtonElement;
  if (!startBtn) {
    document.removeEventListener('keydown', startKeyHandler);
    return;
  }

  if (event.code === 'Enter') {
    startBtn.click();
  }
};

export const setStartButtonHandler = (
  isDisabledLevelSelection: boolean,
  group:number,
  page:number,
) => {
  const startBtn = document.querySelector('.output__start-btn') as HTMLButtonElement;
  const levelSelector = document.querySelector('.output__level') as HTMLSelectElement;
  if (!startBtn || !levelSelector) throw new Error('Error in HTML');

  startBtn.addEventListener('click', () => {
    document.removeEventListener('keydown', startKeyHandler);
    const level = isDisabledLevelSelection ? group : parseInt(levelSelector.value, 10);
    if (Number.isNaN(level)) throw new Error('Error in HTML');
    startGame(isDisabledLevelSelection, level, page);
  });

  document.addEventListener('keydown', startKeyHandler);
};

export default setStartButtonHandler;
