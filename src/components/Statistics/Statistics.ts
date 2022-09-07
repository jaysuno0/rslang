import state from '../../state';
import { getUserStat, IUserStatResp } from '../Api/userStatApi';
import './statistics.css';

interface IStats {
  template: string;
  create: () => void;
  setStats: (statsElement: HTMLDivElement) => void;
}

const stats: IStats = {
  template: `
  <div class="stats__item">
        <p class="stats__title">
          <img src="./img/gameSelectSprint1.png" alt="game icon"/>
          Спринт
        </p>
        <div class="stats__new-words-wrapper">
          <p class="stats__new-words-text">Новых слова за день:</p>
          <p class="stats__new-words-number stats__number sprint__new-words"></p>
        </div>
        <div class="stats__right-answers-wrapper">
          <p class="stats__right-answers-text">Процент правильных ответов:</p>
          <p class="stats__right-answers-number stats__number e">
            <span class="sprint__percentage"></span>%
          </p>
        </div>
        <div class="stats__right-range-wrapper">
          <p class="stats__right-range-text">Самая длинная серия правильных ответов:</p>
          <p class="stats__right-range-number stats__number sprint__range"></p>
        </div>
      </div>
      <div class="stats__item">
        <p class="stats__title">
          <img src="./img/gameSelectAudio2.svg" alt="game icon"/>
          Аудиовызов
        </p>
        <div class="stats__new-words-wrapper">
          <p class="stats__new-words-text">Новых слова за день:</p>
          <p class="stats__new-words-number stats__number audiocall__new-words"></p>
        </div>
        <div class="stats__right-answers-wrapper">
          <p class="stats__right-answers-text">Процент правильных ответов:</p>
          <p class="stats__right-answers-number stats__number">
          <span class="audiocall__percentage"></span>%
          </p>
        </div>
        <div class="stats__right-range-wrapper">
          <p class="stats__right-range-text">Самая длинная серия правильных ответов:</p>
          <p class="stats__right-range-number stats__number audiocall__range"></p>
        </div>
      </div>
      <div class="stats__item">
        <p class="stats__title">Статистика по словам</p>
        <div class="stats__new-words-wrapper">
          <p class="stats__new-words-text">Новых слова за день:</p>
          <p class="stats__new-words-number stats__number words__new-words"></p>
        </div>
        <div class="stats__right-range-wrapper">
          <p class="stats__right-range-text">Процент правильных ответов:</p>
          <p class="stats__right-answers-number stats__number">
            <span class="words__percentage"></span>%
          </p>
        </div>
        <div class="stats__right-answers-wrapper">
          <p class="stats__right-answers-text">Изученных слов за день:</p>
          <p class="stats__right-answers-number stats__number words__learned-words"></p>
        </div>
        </div>
      </div>
      пока работает неправильно, в данный момент допиливается...
      `,

  create() {
    const statsElement = document.createElement('div');
    const screen = document.querySelector('.screen') as HTMLDivElement;
    statsElement.classList.add('stats');
    screen.innerHTML = '';

    if (state.isUserLogged) statsElement.innerHTML = this.template;
    else {
      statsElement.innerHTML = 'Статистика доступна только для зарегистрированных пользователей :)';
    }

    screen.append(statsElement);
    this.setStats(statsElement);
  },

  async setStats(element) {
    const sprintNewWords = element.querySelector('.sprint__new-words') as HTMLParagraphElement;
    const sprintPercentage = element.querySelector('.sprint__percentage') as HTMLParagraphElement;
    const sprintRange = element.querySelector('.sprint__range') as HTMLParagraphElement;
    const audiocallNewWords = element.querySelector('.audiocall__new-words') as HTMLParagraphElement;
    const audiocallPercentage = element.querySelector('.audiocall__percentage') as HTMLParagraphElement;
    const audiocallRange = element.querySelector('.audiocall__range') as HTMLParagraphElement;
    const wordsNewWords = element.querySelector('.words__new-words') as HTMLParagraphElement;
    const wordsPercentage = element.querySelector('.words__percentage') as HTMLParagraphElement;
    const wordsLearned = element.querySelector('.words__learned-words') as HTMLParagraphElement;

    const statsResp: IUserStatResp = await getUserStat(state.userId, state.accessToken);
    if (statsResp.isSuccess) {
      const daysArr = statsResp.stat.optional.daily.day;
      const today = daysArr[daysArr.length - 1];

      const { sprint } = today;
      const { audiocall } = today;

      sprintNewWords.textContent = `${sprint.newWords}`;
      sprintPercentage.textContent = `${((sprint.right + sprint.wrong) / 100) * sprint.right}`;
      sprintRange.textContent = `${sprint.rightAnswersRange}`;

      audiocallNewWords.textContent = `${audiocall.newWords}`;
      audiocallPercentage.textContent = `${((audiocall.right + audiocall.wrong) / 100) * audiocall.right}`;
      audiocallRange.textContent = `${sprint.rightAnswersRange}`;

      wordsNewWords.textContent = `${sprint.newWords + audiocall.newWords}`;
      wordsPercentage.textContent = `${(statsResp.stat.learnedWords / 100) * sprint.right + audiocall.right}`;
      wordsLearned.textContent = `${statsResp.stat.learnedWords}`;
    }
  },
};

export default stats;
