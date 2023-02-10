// TODO next: Check if player id is already exists in court and time slot
// TODO next: rewrite to add new player int players
// TODO next: Weekly View
// TODO next: Move every Day of the Week in one Tab
// TODO next: change eventhandler from click or touch to pointerEvents
// TODO next next :) : Include Database
import {buildCourtHTML, buildSlotHTML, buildPlayerHTML} from "./template.js";
import {closeModal, modalSetFocusToFirstnameOnOpen} from "./modal.js";

let tennisFacility = {};
let {globalCourtData, globalSlotData, globalClickedTimeSlot} = '';

// global element selector
const facility = document.getElementById("tennisFacility");

//// BUILD OBJECTS
////
// Object to build a Player
function Player(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}

// Object to build a Tennis Court
// On one court it is possible to enter 4 player

// Court()
// Function declaration
function Court(courtNumber) {
    this.courtNumber = courtNumber;
    this.timeSlots = {};
}

// Check how many Court the Facility have

// Function expression
const init = () => {
    let params = (new URL(location)).searchParams;
    let numberOfCourts = parseInt(params.get('courts'));

    if (numberOfCourts <= 1 || numberOfCourts >= 21) {
        return
    }
    addNewCourt(numberOfCourts);
    modalSetFocusToFirstnameOnOpen();

/*
    // not yet in use but need for Weekly View
    getNextSevenDates();
*/
}

// add the Courts to the facility
const addNewCourt = (numberOfCourts) => {
    for (let courtNumber = 1; courtNumber <= numberOfCourts; courtNumber++) {

        buildCourtHTML(courtNumber, facility);
        let currentCourt = Object.keys(tennisFacility).length + 1;
        let newCourt = new Court(currentCourt);

        // add the timeslots to the court
        let begin = 7;
        for (let timeSlots = 1; timeSlots <= 14; timeSlots++) {
            let slot = `timeSlot-${timeSlots}`;
            let beginTime = `${begin}:00 Uhr`;
            let endTime = `${begin + 1}:00 Uhr`;
            newCourt.timeSlots[slot] = {
                'time': `${beginTime} - ${endTime}`,
                'players': {}
            };
            begin += 1;
            buildSlotHTML(courtNumber, timeSlots, beginTime, endTime);
        }
        tennisFacility[`court-${currentCourt}`] = newCourt;
        //tennisFacility.push(newCourt);
        console.log(tennisFacility);
    }

    addPlayerButtonEventListener();
}

function getGlobalData () {
    // write data to global variables
    globalClickedTimeSlot = this;
    globalSlotData = parseInt(this.parentElement.getAttribute('data-time-slot'));
    globalCourtData = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data-court'));
}

const addPlayerToSlot = () => {
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

function removePlayerFromTimeSlot () {
    // find the correct player object at the correct position in object and delete it
    const parent = this.parentNode;
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

const addPlayerButtonEventListener = () => {
    let addPlayerButtons = document.querySelectorAll('.add-player');

    for (let i = 0; i < addPlayerButtons.length; i++) {
        addPlayerButtons[i].addEventListener('click', getGlobalData);
    }
}

const removePlayerButtonEventListener = () => {
    let removePlayerButtons = document.querySelectorAll('.remove-player');

    for (let i = 0; i < removePlayerButtons.length; i++) {
        removePlayerButtons[i].addEventListener('click', removePlayerFromTimeSlot);
    }
}

/*
const getNextSevenDates = () => {
    const currentDate = new Date();
    germanDateOutput(currentDate);
    let allDates = new DatesOfOneWeek(fullDate)
    for (let days = 0; days <= 6; days++) {
        addDays(currentDate, days);
        allDates[`date-${days + 1}`] = fullDate;
    }
    tennisFacility.oneWeek = allDates;
    console.log(tennisFacility);
}
*/

/*
const germanDateOutput = date => {
    const thisDate = new Date(date);
    const day = thisDate.getDate();
    const month = (thisDate.getMonth() + 1);
    const year = thisDate.getFullYear();

    return `${day}.${month}.${year}`;
}
*/

/*
const addDays = (date, days) => {
    let getNewDate = new Date(date);
    const newDate = getNewDate.setDate(getNewDate.getDate() + days);
    germanDateOutput(newDate)
}
*/

// Handle the Modal input
const confirmPlayerButton = document.querySelector('[data-confirm-player]');
confirmPlayerButton.addEventListener('click', addPlayerToSlot);

// Make input submit with the enter key
const playerFirstnameInput = document.querySelector('[data-player-firstname]');
const playerLastnameInput = document.querySelector('[data-player-lastname]');
document.body.addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        if (event.target !== playerFirstnameInput && event.target !== playerLastnameInput) {
            return
        }
        if (event.target === playerLastnameInput && playerFirstnameInput.value === '') {
            playerFirstnameInput.focus();
            return
        }
        if (event.target === playerFirstnameInput && playerLastnameInput.value === '') {
            playerLastnameInput.focus();
            return
        }
        addPlayerToSlot();
    }
})

// Save to local Storage
const saveButton = document.querySelector('#saveData');
saveButton.addEventListener('click', () => {
    localStorage.setItem('tennisFacility', JSON.stringify(tennisFacility));
})

// Load data from local Storage
const loadButton = document.querySelector('#loadData');
loadButton.addEventListener('click', () => {
    tennisFacility = localStorage.getItem('tennisFacility');
    console.log(JSON.parse(tennisFacility));
})

init();