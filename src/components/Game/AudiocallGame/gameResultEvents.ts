import store from './gameStore';
import gameRestart from './gameRestart';

const handleBtnsEvent = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains('audio-btn')) {
    const btn = target.closest('.words-list__audio-btn');

    if (!btn) return;

    const id = +btn.id || store.words.length;

    if (store.audio[id]) {
      store.audio[id].currentTime = 0;
      store.audio[id].play();
    }
    return;
  }

  if (target.classList.contains('try-again-btn')) {
    gameRestart();
    return;
  }

  if (target.classList.contains('select-game-btn')) {
    const selectGameBtn = document.querySelector('#game') as HTMLElement;

    selectGameBtn?.click();
  }
};

export const setGameResultHandlers = () => {
  store.appOutput.addEventListener('click', (event) => handleBtnsEvent(event));
};

export default setGameResultHandlers;
