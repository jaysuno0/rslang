import { getWords, IWord } from '../../../Api/wordsApi';
import timer from '../timer/timer';
import GameScreen from '../GameScreen/GameScreen';

const gameScreen = new GameScreen(); 
const MAX_ANSWER = 19;
const RIGHT_ANSWER_CLASS_NAME = 'rightAnswer';
const WRONG_ANSWER_CLASS_NAME = 'wrongAnswer';

function startGame() {
   const form = document.querySelector<HTMLSelectElement>('.select__item');
   const startButton =  document.querySelector('.start-button')
   const randomPage = Math.floor(Math.random() * (30 - 1)) + 1;
   if (!form || !startButton) {return}
   startButton.addEventListener('click', async (e) => {  
      e.preventDefault()

      const gameWords = await (await getWords(+form.value -1,randomPage )).words;

      const gameWordsState = gameWords.map((word) => {
         const isCorrect = Math.round(Math.random());
         const translateToCompare = isCorrect 
         ? word.wordTranslate 
         : gameWords[Math.floor(Math.random() * (19 - 1)) + 1].wordTranslate;
         return { ...word, isCorrect, translateToCompare }
      })
      
      const sortGameWords = gameWordsState.sort(() => Math.random() - 0.5);
      console.log(sortGameWords.map((x) => x.isCorrect));
      gameScreen.create();
      gameScreen.fill(sortGameWords[MAX_ANSWER].word, sortGameWords[MAX_ANSWER].translateToCompare);
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
         checkRightAnswer(words)
         gameScreen.fill(words[answerCount - 1].word, words[answerCount - 1].translateToCompare);
         answerCount -= 1;
      } else {
         console.log('end callback');
      }
   })

   noAnswerButton?.addEventListener('click', () => {
      if (answerCount > 0) {
         checkWrongAnswer(words)
         gameScreen.fill(words[answerCount - 1].word, words[answerCount - 1].wordTranslate);
         answerCount -= 1;
      } else {
         console.log('end callback');
      }
   })
}



function checkRightAnswer(words: IWord[],) {
   const card = document.getElementById('screen__card');
   const cardWord = document.getElementById('cardWord')?.innerHTML;
   const cardTranslate = document.getElementById('cardTranslate')?.innerHTML;
   const cardRightTranslate = words.find(word => word.word === cardWord)?.wordTranslate
   if (!card) { return }
   if(cardTranslate === cardRightTranslate) {
      rightAnswer(card)
   } else {
      wrongAnswer(card)
   }  
}

function checkWrongAnswer(words: IWord[],) {
   const card = document.getElementById('screen__card');
   const cardWord = document.getElementById('cardWord')?.innerHTML;
   const cardTranslate = document.getElementById('cardTranslate')?.innerHTML;
   const cardRightTranslate = words.find(word => word.word === cardWord)?.wordTranslate

   if (!card) { return }
   if(cardTranslate !== cardRightTranslate) {
      rightAnswer(card)
   } else {
      wrongAnswer(card)
   }  
}

function rightAnswer(card: HTMLElement) {
   card.classList.add(RIGHT_ANSWER_CLASS_NAME);
   const defaultStyle = setTimeout(() => removeAnswerClassList(card, RIGHT_ANSWER_CLASS_NAME), 200)
}

function wrongAnswer(card: HTMLElement) {
   card.classList.add(WRONG_ANSWER_CLASS_NAME);
   const defaultStyle = setTimeout(() => removeAnswerClassList(card, WRONG_ANSWER_CLASS_NAME), 200)
}

function removeAnswerClassList(card: HTMLElement, className: string) {
   card.classList.remove(`${className}`);
}