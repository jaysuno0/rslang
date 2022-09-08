import { IWord } from '../../Api/wordsApi';

const icon = `<svg class="audio-btn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path class="audio-btn" d="M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm11.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002
  1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511
  1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073
  2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z"/></svg>
`;

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
  if (!levelSelector) throw new Error('Error in HTML');

  levelSelector.value = `${group}`;
  levelSelector.disabled = isDisabledLevelSelection;
};

export const renderMsg = (appOutput: HTMLDivElement, msg: string) => {
  const output = appOutput;

  output.innerHTML = `<p>${msg}</p>`;
};

export const renderErrMsg = (appOutput: HTMLDivElement, errMsg: string) => {
  const output = appOutput;

  output.innerHTML = `<p>Ошибка!</p><p>${errMsg}</p>`;
};

export const renderGameFrame = (
  appOutput: HTMLDivElement,
  word: string,
  imageURL: string,
  answers: string[],
) => {
  const renderedAnswers = answers.map((str, i) => `<span id="answer-${i + 1}" class="game-frame__answer">${i + 1}. ${str}</span>`).join('');
  const gameFrame = document.createElement('div');
  const img = new Image();
  img.src = imageURL;
  gameFrame.classList.add('output__game-frame');
  gameFrame.innerHTML = `
    <div class="game-frame__word-image" style="display:none; background-image: url('${imageURL}');"></div>
    <div class="game-frame__word-wrapper">
      <button class="game-frame__audio-btn audio-btn big">${icon}</button>
      <span id="word">${word}</span>
    </div>
    <div class="game-frame__answers-wrapper">
      ${renderedAnswers}
    </div>
    <button class="game-frame__btn">Не знаю<button>
  `;

  const output = appOutput;
  output.innerHTML = '';
  output.append(gameFrame);
};

const renderWord = (id: number, word: string, translate: string) => `
  <div class="words-list__word-wrapper">
    <button id="${id}" class="words-list__audio-btn audio-btn">${icon}</button>
    <span class="words-list__word">${word}</span>
    <span class="words-list__translate">  -  ${translate}</span>
  </div>
`;

export const renderGameResult = (
  appOutput: HTMLDivElement,
  resultMsg: string,
  rightAnswerIdxs: number[],
  wrongAnswerIdxs: number[],
  words: IWord[],
) => {
  const gameResult = document.createElement('div');
  const renderedRightWords = rightAnswerIdxs.map((idx) => renderWord(
    idx,
    words[idx].word,
    words[idx].wordTranslate,
  )).join('');
  const renderedWrongWords = wrongAnswerIdxs.map((idx) => renderWord(
    idx,
    words[idx].word,
    words[idx].wordTranslate,
  )).join('');

  gameResult.classList.add('output__game-result');
  gameResult.innerHTML = `
    <div class="game-result__board">
      <h1 class="game-result__result-message">${resultMsg}</h1>
      <h1 class="game-result__i-know">Я ЗНАЮ: ${rightAnswerIdxs.length}</h1>
      ${renderedRightWords}
      <h1 class="game-result__errors">ОШИБКИ: ${wrongAnswerIdxs.length}</h1>
      ${renderedWrongWords}
    </div>
    <div class="game-result__btn-wrapper">
    <button class="game-result__btn try-again-btn">Играть ещё</button>
    <button class="game-result__btn select-game-btn">Выбор игр</button>
    </div>
  `;
  const output = appOutput;
  output.innerHTML = '';
  output.append(gameResult);
};
