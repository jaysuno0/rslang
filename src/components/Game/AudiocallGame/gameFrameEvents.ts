import store from './gameStore';
import { showGameFrame, setAnswer } from './gameFrame';

const handleBtnsEvent = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (store.isEventsDisabled || !target) return;

  if (target.classList.contains('audio-btn')) {
    store.audio.currentTime = 0;
    return;
  }

  if (target.classList.contains('game-frame__answer') && !store.isAnswered) {
    const id = +target.id.split('answer-')[1];

    setAnswer(id);
    return;
  }

  if (target.classList.contains('game-frame__btn')) {
    if (store.isAnswered) {
      store.currentWord += 1;
      if (store.currentWord < store.words.length) {
        showGameFrame();
      }
    } else {
      setAnswer();
    }
  }
};

const gameFrameKeyHandler = (event: KeyboardEvent) => {
  const nextBtn = document.querySelector('.game-frame__btn') as HTMLButtonElement;
  if (!nextBtn) {
    document.removeEventListener('keydown', gameFrameKeyHandler);
    return;
  }

  if (event.code === 'Enter') {
    nextBtn.click();
    return;
  }

  if (event.code === 'Space') {
    const audioBtn = document.querySelector('.game-frame__audio-btn') as HTMLButtonElement;
    audioBtn?.click();
    return;
  }

  if (event.code.startsWith('Digit')) {
    const digit = +event.code.slice(5);
    if ((digit > 0) && (digit <= store.answers.length)) {
      const answerBtn = document.querySelector(`#answer-${digit}`) as HTMLElement;
      answerBtn?.click();
    }
  }
};

export const setGameFrameHandlers = () => {
  store.appOutput.addEventListener('click', (event) => handleBtnsEvent(event));
  document.addEventListener('keydown', gameFrameKeyHandler);
};

export default setGameFrameHandlers;
