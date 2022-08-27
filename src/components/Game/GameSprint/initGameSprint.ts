import './LevelSelect/sprintLevelSelect.css'
import './GameScreen/gameScreen.css';
import timer from './timer/timer'

import GameScreen from './GameScreen/GameScreen'

const gameScreen = new GameScreen(); 

gameScreen.create();
timer();