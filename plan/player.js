import {buildPlayerHTML} from "./template.js";
import {closeModal} from "./modal.js";

const removePlayerButtonEventListener = (tennisFacility) => {
    let removePlayerButtons = document.querySelectorAll('.remove-player');

    for (let i = 0; i < removePlayerButtons.length; i++) {
        removePlayerButtons[i].addEventListener('click', () => {
            removePlayerFromTimeSlot(tennisFacility);
        });
    }
}

function removePlayerFromTimeSlot (tennisFacility) {
    // find the correct player object at the correct position in object and delete it
    const parent = this.parentNode; // TODO Mentoring: das tut nun nicht mehr?
    const currentPlayersId = parent.getAttribute('data-player');
    const slotData = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data-time-slot'));
    const courtData = parseInt(this.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-court'));

    // delete the player
    delete tennisFacility[`court-${courtData}`].timeSlots[`timeSlot-${slotData}`].players[currentPlayersId];

    // delete html player element
    parent.parentNode.removeChild(this.parentNode);

    // TODO remove console log
    console.log(tennisFacility);
}


export const addPlayerToSlot = (tennisFacility, globalCourtData, globalSlotData, globalClickedTimeSlot) => {
    function Player(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    // get first and lastname input value
    let playerFirstname = document.querySelector('[data-player-firstname]').value;
    let playerLastname = document.querySelector('[data-player-lastname]').value;

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
    console.log('slotPlayers', slotPlayers);

    // find the correct Court object
    // const courtPlayerLength = Object.keys(slotPlayers).length + 1;
    let playerNumber =  Object.keys(slotPlayers).length;
    console.log('playerNumber', playerNumber)

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
    removePlayerButtonEventListener();

    // clear global Data
    globalCourtData
    globalSlotData
    globalClickedTimeSlot = '';

    // TODO remove console log
    console.log(tennisFacility);
}