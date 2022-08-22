import '../img/footerRsLogo.svg';

export default class FooterRender {
  template: string;

  constructor() {
    this.template = `
      <div class="footer">
         <div class="rsSchoolLink">
            <a href="https://rs.school/js/" target="_blank">
               <img src="./img/footerRsLogo.svg" alt="rsLogo">
            </a>
         </div>
         <div class="teamLink">
            <a href="https://github.com/jaysuno0" target="_blank">Daniil Kochkin</a>
            <a href="https://github.com/Alexander-M-rss" target="_blank">Oleksandr M</a>
            <a href="https://github.com/rdaniliuk" target="_blank">Roman Daniliuk</a>
         </div>
         <div class="year">
            <span>2022</span>
         </div>
      </div>
        `;
  }

  render() {
    const { body } = document;
    const footer = document.createElement('footer');
    footer.innerHTML = this.template;
    body.append(footer);
  }
}
