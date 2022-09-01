export default class ResultScreen {
  template: string;

  constructor() {
    this.template = `
    <div class="result__title">Результаты игры</div>
    <div class="result__tables">
      <div class="result__table win">
      <div class="table__header">
        <span class="table__title">Верные ответы:</span>
        <span class="table__count" id="rightCount">0</span>
      </div>
      <div class="table__words" id="rightWords">
      </div>
      </div>
      <div class="result__table lose">
        <div class="table__header">
          <span class="table__title">Неверные ответы:</span>
          <span class="table__count" id="wrongCount">0</span>
        </div>
        <div class="table__words" id="wrongWords">
        </div>
      </div>
    </div>
          `;
  }

  render() {
    const screen = document.querySelector('.screen');
    const resultScreenContainer = document.createElement('div');
    resultScreenContainer.classList.add('resultScreen');
    resultScreenContainer.id = ('resultScreen');
    resultScreenContainer.innerHTML = this.template;
    screen?.append(resultScreenContainer);
  }

  create() {
    const screen = document.querySelector('.screen');
    if (screen) {
      screen.innerHTML = ' ';
    }
    this.render();
  }
}
