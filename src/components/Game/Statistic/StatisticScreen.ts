export default class StatisticScreen {
   template: string;
 
   constructor() {
     this.template = `
      
           `;
   }
 
   render() {
     const screen = document.querySelector('.screen');
     const StatisticContainer = document.createElement('div');
     StatisticContainer.classList.add('statisticScreen');
     StatisticContainer.id = ('statisticScreen');
     StatisticContainer.innerHTML = this.template;
     screen?.append(StatisticContainer);
   }
 
   create() {
     const screen = document.querySelector('.screen');
     if (screen) {
       screen.innerHTML = ' ';
     }
     this.render();
   }
 }
 