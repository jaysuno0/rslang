export function footerHidden() {
  const main = document.querySelector('.main');
  const footer = document.querySelector('.footer');
  main?.classList.add('mainGame');
  footer?.classList.add('footerHidden');
}

export function footerShow() {
  const main = document.querySelector('.main');
  const footer = document.querySelector('.footer');
  main?.classList.remove('mainGame');
  footer?.classList.remove('footerHidden');
}
