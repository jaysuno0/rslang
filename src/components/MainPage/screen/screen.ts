export default function screenRender() {
  const main = document.querySelector('.main');
  const screen = document.createElement('div');
  screen.classList.add('screen');
  main?.append(screen);
}
