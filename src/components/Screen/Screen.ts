import './screen.css';

interface IScreen {
  create: () => void;
}

const screen:IScreen = {
  create() {
    const main = document.querySelector('.main') as HTMLElement;
    const element = document.createElement('div');

    element.classList.add('screen');
    main.append(element);
  },
};

export default screen;
