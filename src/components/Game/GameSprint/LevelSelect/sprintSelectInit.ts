import { getWords, IWord } from '../../../Api/wordsApi';
import timer from '../timer/timer';
import GameScreen from '../GameScreen/GameScreen';

const gameScreen = new GameScreen(); 
const MAX_ANSWER = 19;

function startGame() {
   const form = document.querySelector<HTMLSelectElement>('.select__item');
   const startButton =  document.querySelector('.start-button')
   const randomPage = Math.floor(Math.random() * (30 - 1)) + 1;
   if (!form || !startButton) {return}
   startButton.addEventListener('click', async (e) => {  
      e.preventDefault()

      const gameWords = await (await getWords(+form.value -1,randomPage )).words
      const sortGameWords = gameWords.sort(() => Math.random() - 0.5);
      console.log(gameWords);
      gameScreen.create();
      gameScreen.fill(sortGameWords[MAX_ANSWER].word, sortGameWords[MAX_ANSWER].wordTranslate);
      timer();
      cardButtonListeners(sortGameWords, MAX_ANSWER)
   })
}
export default startGame;


function cardButtonListeners(words: IWord[], answerCount: number) {
   const yesAnswerButton = document.getElementById('yes');
   const noAnswerButton = document.getElementById('no');
   yesAnswerButton?.addEventListener('click', () => {
      if (answerCount > 0) {
         gameScreen.fill(words[answerCount - 1].word, words[answerCount - 1].wordTranslate);
         answerCount -= 1;
      } else {
         console.log('end callback');
      }
   })

   noAnswerButton?.addEventListener('click', () => {
      if (answerCount > 0) {
         gameScreen.fill(words[answerCount - 1].word, words[answerCount - 1].wordTranslate);
         answerCount -= 1;
      } else {
         console.log('end callback');
      }
   })
}