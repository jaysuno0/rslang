/* eslint-disable import/no-cycle */
import state from '../../state';
import './statistics.css';
import {
  getUserStat,
  IGameStat,
  IUserStatResp,
  upsertUserStat,
} from '../Api/userStatApi';

export interface IGameData {
  right: number,
  wrong: number,
  newWords: number,
  learnedWords: number,
  rightAnswersRange: number,
}

interface IStats {
  template: string;
  create: () => void;
  changeNumber: (n: number) => void;
  setStats: (statsElement: HTMLDivElement) => void;
  update: (isSprint: boolean, data: IGameData) => void;
  addLearnedWord: () => void;
  deleteLearnedWord: () => void;
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
      </div>`,

  create() {
    const statsElement = document.createElement('div');
    const screen = document.querySelector('.screen') as HTMLDivElement;
    statsElement.classList.add('stats');
    screen.innerHTML = '';
    screen.append(statsElement);

    if (state.isUserLogged) {
      statsElement.innerHTML = this.template;
      this.setStats(statsElement);
    } else {
      statsElement.innerHTML = 'Статистика доступна только для зарегистрированных пользователей :)';
    }
  },

  changeNumber(n) {
    let num = n;
    if (Number.isNaN(num) || num === Infinity || !n) num = 0;
    return num;
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
      sprintPercentage.textContent = `${this.changeNumber(Math.round((100 / (sprint.right + sprint.wrong)) * sprint.right))}`;
      sprintRange.textContent = `${sprint.rightAnswersRange}`;
      audiocallNewWords.textContent = `${audiocall.newWords}`;
      audiocallPercentage.textContent = `${this.changeNumber(Math.round((100 / (audiocall.right + audiocall.wrong)) * audiocall.right))}`;
      audiocallRange.textContent = `${audiocall.rightAnswersRange}`;
      wordsNewWords.textContent = `${sprint.newWords + audiocall.newWords}`;
      wordsPercentage.textContent = `${
        this.changeNumber(
          Math.round(
            (100 / (sprint.right + audiocall.right + sprint.wrong + audiocall.wrong))
            * (sprint.right + audiocall.right),
          ),
        )}`;
      wordsLearned.textContent = `${statsResp.stat.learnedWords}`;
    }
  },

  async update(isSprint, data) {
    const statsResp = await getUserStat(state.userId, state.accessToken);

    if (statsResp.isSuccess) {
      const days = statsResp.stat.optional.daily.day;
      const newUserStat = { ...statsResp.stat };
      const today = days[days.length - 1];
      let newGameData: IGameStat;

      if (isSprint) {
        newGameData = { ...today.sprint };
        newUserStat.optional.daily.day[days.length - 1].sprint = newGameData;
        newGameData.rightAnswersRange = Math.max(
          today.sprint.rightAnswersRange,
          data.rightAnswersRange,
        );
      } else {
        newGameData = { ...today.audiocall };
        newUserStat.optional.daily.day[days.length - 1].audiocall = newGameData;
        newGameData.rightAnswersRange = Math.max(
          today.audiocall.rightAnswersRange,
          data.rightAnswersRange,
        );
      }

      newGameData.learnedWords += data.learnedWords;
      newGameData.newWords += data.newWords;
      newGameData.right += data.right;
      newGameData.wrong += data.wrong;

      newUserStat.learnedWords += data.learnedWords;
      upsertUserStat(state.userId, state.accessToken, newUserStat);
    }
  },

  async addLearnedWord() {
    const statsResp = await getUserStat(state.userId, state.accessToken);
    if (statsResp.isSuccess) {
      const newStat = { ...statsResp.stat };
      newStat.learnedWords += 1;
      upsertUserStat(state.userId, state.accessToken, newStat);
    }
  },

  async deleteLearnedWord() {
    const statsResp = await getUserStat(state.userId, state.accessToken);
    if (statsResp.isSuccess) {
      const newStat = { ...statsResp.stat };
      newStat.learnedWords -= 1;
      upsertUserStat(state.userId, state.accessToken, newStat);
    }
  },
};

export default stats;
