export const renderIntro = (
  appOutput: HTMLDivElement,
  isDisabledLevelSelection: boolean,
  group: number,
) => {
  const introHTML = `
  <h1 class="output__game-name">АУДИОВЫЗОВ</h1>
  <p>«Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух.</p>
  <p>Управление:</p>
  <ul class="output__level-list">
    <li>⊛ Используйте мышь, чтобы выбрать</li>
    <li>⊛ Используйте цифровые клавиши от 1 до 5 для выбора ответа</li>
    <li>⊛ Используйте пробел для повтроного звучания слова</li>
    <li>⊛ Используйте клавишу Enter для подсказки или для перехода к следующему слову</li>
  </ul>
  <div class="output__level-wraper">
    <span>Уровень сложности:</span>
    <select class="output__level">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
    </select>
    <button class="output__btn output__start-btn">
      Начать игру
    <button>
  </div>
  `;
  const output = appOutput;

  output.innerHTML = introHTML;

  const levelSelector = document.querySelector('.output__level') as HTMLSelectElement;
  if(!levelSelector) throw new Error('Error in HTML');

  levelSelector.value = `${group}`;
  levelSelector.disabled = isDisabledLevelSelection;
};
