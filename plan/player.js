import {buildPlayerHTML} from "./template.js";
import {closeModal} from "./modal.js";

const removePlayerButtonEventListener = (tennisFacility) => {
    const removePlayerButtons = document.querySelectorAll('.remove-player');

    for (let i = 0; i < removePlayerButtons.length; i++) {
        removePlayerButtons[i].addEventListener('click', (event) => {
            removePlayerFromTimeSlot(event, tennisFacility);
        });
    }
}

function removePlayerFromTimeSlot (event, tennisFacility) {
    // find the correct player object at the correct position in object and delete it
    const parent = event.target.parentNode;
    const currentPlayersId = parent.getAttribute('data-player');
    const slotData = parseInt(parent.parentElement.parentElement.getAttribute('data-time-slot'));
    const courtData = parseInt(parent.parentElement.parentElement.parentElement.parentElement.getAttribute('data-court'));

    // delete the player
    delete tennisFacility[`court-${courtData}`].timeSlots[`timeSlot-${slotData}`].players[currentPlayersId];

    // delete html player element
    parent.parentNode.removeChild(parent);
}


export const addPlayerToSlot = (state) => {
    // TODO: Refactor to be more readable
    const {tennisFacility, globalCourtData, globalSlotData, globalClickedTimeSlot} = state;

    function Player(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    // get first and lastname input value
    const playerFirstname = document.querySelector('[data-player-firstname]').value;
    const playerLastname = document.querySelector('[data-player-lastname]').value;

    // if one of the inputs is not filled
    if (!playerFirstname || !playerLastname) {
        if (!playerFirstname && !playerLastname) {
            document.querySelector('[data-player-firstname]').focus();
            return alert('Please enter first and lastname');
        }
        if (!playerFirstname && playerLastname) {
            document.querySelector('[data-player-firstname]').focus();
            return alert('Please enter firstname');
        }
        if (playerFirstname && !playerLastname) {
            document.querySelector('[data-player-lastname]').focus();
            return alert('Please enter lastname');
        }
    }
    // write new Player Object
    // TODO have to rewrite to add the player object into a array of players to easier push and pop player
    const newPlayer = new Player(playerFirstname, playerLastname);

    const slotPlayers = tennisFacility[`court-${globalCourtData}`].timeSlots[`timeSlot-${globalSlotData}`].players;

    // find the correct Court object
    // const courtPlayerLength = Object.keys(slotPlayers).length + 1;
    let playerNumber =  Object.keys(slotPlayers).length;

    /*
        // add new Player to the current timeSlot
        for (player in slotPlayers) {
            console.log('for loop', player, playerNumber)
            console.log('for loop playerNumber', playerNumber)
            do {
                console.log('for while loop', playerNumber)
                playerNumber++;
                console.log('for while loop', playerNumber)
            } while (player === playerNumber || playerNumber === 0)
        }
    */
    tennisFacility[`court-${globalCourtData}`].timeSlots[`timeSlot-${globalSlotData}`].players[playerNumber] = newPlayer;

    // add Player to HTML
    buildPlayerHTML(playerFirstname, playerLastname, playerNumber, globalClickedTimeSlot);

    closeModal();

    // trigger eventListener
    removePlayerButtonEventListener(tennisFacility);

    // clear global Data
    state.globalCourtData = '';
    state.globalSlotData = '';
    state.globalClickedTimeSlot = '';

}