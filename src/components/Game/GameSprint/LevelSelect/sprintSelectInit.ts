import GameScreen from '../GameScreen/GameScreen';

function check() {
  const form = document.querySelector<HTMLSelectElement>('.select__item');
  const gemeScreen = new GameScreen();
  if (form) {
    form.addEventListener('change', () => console.log(form.value));
    gemeScreen.create();
  }
}
export default check;
