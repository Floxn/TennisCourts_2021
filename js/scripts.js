
// TODO next: Make Timetable for each Court to add players on court for each Hour for example 17-18 o´clock order 09-10 o´clock


let tennisFacility = [];

const facility = document.getElementById("tennisFacility");

//// BUILD OBJECTS
////
// Object to build a Player
function Player(forename, lastname) {
    this.forename = forename;
    this.lastname = lastname;
}

// Object to build a Tennis Court
// On one court it is possible to enter 4 player
function Court(courtNumber) {
    this.courtNumber = courtNumber;
    this.timeSlots = {};
    this.players = {};
}

// Check how many Court the Facility have
function howManyCourts() {
    let numberOfCourts = (function ask() {
        var number = prompt('How many Courts are on the tennis facility?');
        return isNaN(number) || +number <= 0 ? ask() : number;
    }());
    addNewCourt(numberOfCourts);
}

// add the Courts to the facility
function addNewCourt(numberOfCourts) {
    for (let courtNumber = 1; courtNumber <= numberOfCourts; courtNumber++) {

        buildCourtHTML(courtNumber);
        let newCourt = new Court(tennisFacility.length + 1);

        // add the timeslots to the court
        let begin = 7;
        for (let timeSlots = 1; timeSlots <= 14; timeSlots++) {
            buildSlotHTML(courtNumber, timeSlots);
            let slot = 'timeSlot-' + timeSlots;
            newCourt.timeSlots[slot] = begin + ':00 Uhr - ' + (begin+1) + ':00 Uhr';
            begin += 1;
        }

        tennisFacility.push(newCourt);
    }
    addPlayerButtonEventListener();

}

function buildSlotHTML(courtNumber,slotNumber) {
    let container = document.querySelector('[data-court="'+ courtNumber +'"]')
    let theSlot = container.querySelector('.court-slots');

    const slotNumberClass = 'time-slot-' + slotNumber;

    newSlot = document.createElement('div');
    newSlot.classList.add('time-slot', slotNumberClass);
    newSlot.setAttribute('data-time-slot', slotNumber);
    newSlot.textContent = 'Time Slot: ' + slotNumber;
    const slotElement = newSlot

    // Build Player Wrapper
    slotPlayer = document.createElement('div');
    slotPlayer.classList.add('slot-players');

    theSlot.appendChild(newSlot);
    slotElement.appendChild(slotPlayer);
}

function buildCourtHTML(courtNumber) {
    const courtNumberClass = 'court-' + courtNumber;

    // Build Court Wrapper
    newCourt = document.createElement('div');
    newCourt.classList.add('court', courtNumberClass);
    newCourt.setAttribute('data-court', courtNumber);
    newCourt.id = courtNumberClass;
    const courtElement = newCourt;

    // Build Court Headline
    courtHeadline = document.createElement('h2');
    courtHeadline.textContent = 'Court-No: ' + courtNumber;

    // Build Player Wrapper
    courtPlayers = document.createElement('div');
    courtPlayers.classList.add('court-players');

    // Build Timeslots Wrapper
    courtTimeSlots = document.createElement('div');
    courtTimeSlots.classList.add('court-slots');

    // Build add Player Button
    addPlayerButton = document.createElement('button');
    addPlayerButton.classList.add('add-player', 'add-player-' + courtNumberClass);
    addPlayerButton.textContent = 'add new Player';

    facility.appendChild(courtElement);
    courtElement.appendChild(courtHeadline);
    courtElement.appendChild(courtPlayers);
    courtElement.appendChild(courtTimeSlots);
    courtElement.appendChild(addPlayerButton);
}

function buildPlayerHTML(playerForename, playerLastname, playerNumber) {
    // build new players element and append it
    newPlayerElement = document.createElement('div');
    newPlayerElement.classList.add('player')
    newPlayerElement.setAttribute('data-player', playerNumber);
    newPlayerElement.textContent = playerForename + ' ' + playerLastname;

    removeButton = document.createElement('button');
    removeButton.classList.add('remove-player');
    removeButton.textContent = '-';
    newPlayerElement.appendChild(removeButton);
}

function addPlayersToCourt() {

    // get the court data
    let courtData = parseInt(this.parentElement.getAttribute('data-court'));

    // get the name of the player who will be added
    const playerForename = prompt("Please enter Forename");
    const playerLastname = prompt("Please enter Lastname");
    const newPlayer = new Player(playerForename, playerLastname);

    // find the correct Court object
    let currentCourt = tennisFacility.find(Court => Court.courtNumber === courtData);

    // get length of Players Object in the current court
    let courtPlayerLength = Object.keys(currentCourt.players).length + 1;
    playerNumber = 'player-' + courtPlayerLength;
    currentCourt.players[playerNumber] = newPlayer;

    // add Player
    buildPlayerHTML(playerForename, playerLastname, playerNumber);
    this.previousElementSibling.appendChild(newPlayerElement);

    // trigger eventListener
    removePlayerButtonEventListener();
    console.log(tennisFacility);

}

function removePlayerFromCourt() {
    const parent = this.parentNode;
    const currentPlayersId = parent.getAttribute('data-player');
    let playersCourtId = parent.parentNode.parentNode.id;
    playersCourtId = playersCourtId.replace('court-','');
    playersCourtId = parseInt(playersCourtId);

    let currentCourt = tennisFacility.find(Court => Court.courtNumber === playersCourtId);
    delete currentCourt.players[currentPlayersId];

    parent.parentNode.removeChild(this.parentNode);

    // TODO remove console log
    console.log('Player ' + currentPlayersId + ' is deleted from Court-id: ' + playersCourtId);

}

function addPlayerButtonEventListener() {
    let addPlayerButtons = document.querySelectorAll('.add-player');

    for (let i = 0; i < addPlayerButtons.length; i++) {
        addPlayerButtons[i].addEventListener('click', addPlayersToCourt);
    }
}

function removePlayerButtonEventListener() {
    let removePlayerButtons = document.querySelectorAll('.remove-player');

    for (let i = 0; i < removePlayerButtons.length; i++) {
        removePlayerButtons[i].addEventListener('click', removePlayerFromCourt);
    }
}


getNextSevenDates();
function getNextSevenDates() {
    const currentDate = new Date();
    germanDateOutput(currentDate);

    for (let i = 1; i <= 6; i++) {
        addDays(currentDate, i);
    }
}

function germanDateOutput(date) {
    const thisDate = new Date(date);
    const day = thisDate.getDate();
    const month = (thisDate.getMonth()+1);
    const year = thisDate.getFullYear();
    console.log('Datum: ' + day + '.' + month + '.' + year);
}

function addDays(date, days) {
    let getNewDate = new Date(date);
    const newDate = getNewDate.setDate(getNewDate.getDate() + days);
    germanDateOutput(newDate);
}

document.addEventListener("DOMContentLoaded", howManyCourts);