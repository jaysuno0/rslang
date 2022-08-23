export enum ButtonGameSelectActionsTypes {
   GameSprint = 'gameSprint',
   GameAudio = 'gameAudio',
}

export type ButtonGameSelectActions = { [key in ButtonGameSelectActionsTypes]: () => void }

function setupGameSelectButtonListeners (actions: ButtonGameSelectActions) {
   const DIV_GAME_SELECT_CLASS = 'game__wrapper';
   const DIV_GAME_SELECT_ID = 'games';
   const gameSelect = document.getElementById(DIV_GAME_SELECT_ID);
   gameSelect?.addEventListener('click', (e) => {
     const eTarget = e.target as Element;
     const gameSelectElem = (eTarget.closest(`.${DIV_GAME_SELECT_CLASS}`));
     if (gameSelectElem?.id) {
       actions[gameSelectElem.id as ButtonGameSelectActionsTypes]();
     }
   });

}

export default setupGameSelectButtonListeners;
