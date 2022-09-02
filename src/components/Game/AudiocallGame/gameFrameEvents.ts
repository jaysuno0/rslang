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

export const setGameFrameHandlers = () => {
  store.appOutput.addEventListener('click', (event) => handleBtnsEvent(event));
};

export default setGameFrameHandlers;
