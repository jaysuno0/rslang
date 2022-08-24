import '../img/team1.png';
import '../img/team2.png';
import '../img/team3.jpg';

export default class aboutTeamRender {
  template: string;

  constructor() {
    this.template = `
      <div class="aboutTeam__title">
      <span>- Our team -</span>
      </div>
      <div class="cards">
        <div class="team__card">
          <div class="card__header">
            <div class="card__image">
              <img src="../img/team2.png" alt="team1" />
            </div>
            <div class="card__title">
              <div class="card__name">Daniil Kochkin</div>
              <div class="card__text">Team Lead, Junior Frontend Developer</div>
            </div>
          </div>
          <div class="card__list">
            <ul>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
            </ul>
          </div>
          <div class="button__wrapper">
            <a href="https://github.com/jaysuno0" target="_blank">
              <div class="card__button">
                <span>GitHub</span>
              </div>
            </a>
          </div>
        </div>
        <div class="team__card">
          <div class="card__header">
            <div class="card__image">
              <img src="../img/team3.jpg" alt="team1" />
            </div>
            <div class="card__title">
              <div class="card__name">Oleksandr M</div>
              <div class="card__text">Junior Frontend Developer</div>
            </div>
          </div>
          <div class="card__list">
            <ul>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
            </ul>
          </div>
          <div class="button__wrapper">
            <a href="https://github.com/Alexander-M-rss" target="_blank">
              <div class="card__button">
                <span>GitHub</span>
              </div>
            </a>
          </div>
        </div>
        <div class="team__card">
          <div class="card__header">
            <div class="card__image">
              <img src="../img/team1.png" alt="team1" />
            </div>
            <div class="card__title">
              <div class="card__name">Roman Daniliuk</div>
              <div class="card__text">Junior Frontend Developer</div>
            </div>
          </div>
          <div class="card__list">
            <ul>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
            </ul>
          </div>
          <div class="button__wrapper">
            <a href="https://github.com/rdaniliuk" target="_blank">
              <div class="card__button">
                <span>GitHub</span>
              </div>
            </a>
          </div>
        </div>
      </div>
         `;
  }

  render() {
    const screen = document.querySelector('.screen');
    const aboutTeam = document.createElement('div');
    aboutTeam.classList.add('aboutTeam');
    aboutTeam.id = ('aboutTeam');
    aboutTeam.innerHTML = this.template;
    screen?.append(aboutTeam);
  }

  create() {
    const screen = document.querySelector('.screen');
    if (screen) {
      screen.innerHTML = ' ';
    }
    this.render();
  }
}