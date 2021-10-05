// TODO next: Check if player id is already exists in court and time slot
// TODO next next :) : Include Database

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
}

// Check how many Court the Facility have
function howManyCourts() {
    let numberOfCourts = (function ask() {
        var number = prompt('How many Courts are on the tennis facility? 1 - 20 is allowed');
        return isNaN(number) || +number <= 0 || +number >= 21 ? ask() : number;
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
            let slot = 'timeSlot-' + timeSlots;
            let beginTime = begin + ':00 Uhr';
            let endTime = (begin+1) + ':00 Uhr';
            newCourt.timeSlots[slot] = {
                'time': beginTime + ' - ' + endTime,
                'players': {}
            };
            begin += 1;
            buildSlotHTML(courtNumber, timeSlots, beginTime, endTime);
        }

        tennisFacility.push(newCourt);
    }

    addPlayerButtonEventListener();
}

function buildSlotHTML(courtNumber,slotNumber,beginTime, endTime) {
    const container = document.querySelector('[data-court="'+ courtNumber +'"]')
    const theSlot = container.querySelector('.court-slots');

    const slotNumberClass = 'time-slot-' + slotNumber;

    newSlot = document.createElement('div');
    newSlot.classList.add('time-slot', slotNumberClass);
    newSlot.setAttribute('data-time-slot', slotNumber);

    // Build Slot Headline
    slotHeadline = document.createElement('div');
    slotHeadline.classList.add('time-slot-time');
    slotHeadline.textContent = beginTime + ' - ' + endTime;

    // Build Player Wrapper
    slotPlayer = document.createElement('div');
    slotPlayer.classList.add('time-slot-players');

    // Build add Player Button
    addPlayerButton = document.createElement('button');
    addPlayerButton.classList.add('add-player','btn', 'btn-sm', 'btn-outline-success', 'add-player-' + slotNumberClass);
    addPlayerButton.textContent = 'add new Player';

    theSlot.appendChild(newSlot);
    newSlot.appendChild(slotHeadline);
    newSlot.appendChild(slotPlayer);
    newSlot.appendChild(addPlayerButton);
}

function buildCourtHTML(courtNumber) {
    const courtNumberClass = 'court-' + courtNumber;

    // Build Court Wrapper
    newCourt = document.createElement('div');
    newCourt.classList.add('court', courtNumberClass);
    newCourt.setAttribute('data-court', courtNumber);
    newCourt.id = courtNumberClass;

    // Build Court Headline
    courtHeadline = document.createElement('h2');
    courtHeadline.textContent = 'Court-No: ' + courtNumber;

    // Build Timeslots Wrapper
    courtTimeSlots = document.createElement('div');
    courtTimeSlots.classList.add('court-slots');

    facility.appendChild(newCourt);
    newCourt.appendChild(courtHeadline);
    newCourt.appendChild(courtTimeSlots);
}

function buildPlayerHTML(playerForename, playerLastname, playerNumber) {
    // build new players element and append it
    newPlayerElement = document.createElement('div');
    newPlayerElement.classList.add('player', 'bg-success', 'bg-opacity-50');
    newPlayerElement.setAttribute('data-player', playerNumber);
    newPlayerElement.textContent = playerForename + ' ' + playerLastname;

    removeButton = document.createElement('button');
    removeButton.classList.add('remove-player', 'btn', 'btn-danger', 'rounded-0');
    removeButton.textContent = 'x';
    newPlayerElement.appendChild(removeButton);
}

function addPlayerToTimeSlot() {
    // get the time slot and court data from the buttons parent time slot and court
    const slotData = parseInt(this.parentElement.getAttribute('data-time-slot'));
    const courtData = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data-court'));
    // get the name of the player who will be added
    // TODO need to check if prompt is empty dont return NULL
    const playerForename = prompt("Please enter Forename");
    const playerLastname = prompt("Please enter Lastname");
    const newPlayer = new Player(playerForename, playerLastname);

    // find the correct Court object
    const currentCourt = tennisFacility.find(Court => Court.courtNumber === courtData);
    const currentTimeSlot = currentCourt.timeSlots['timeSlot-' + slotData];

    // get length of Players Object in the current court
    const courtPlayerLength = Object.keys(currentTimeSlot.players).length + 1;
    playerNumber = 'player-' + courtPlayerLength;
    currentTimeSlot.players[playerNumber] = newPlayer;

    // add Player
    buildPlayerHTML(playerForename, playerLastname, playerNumber);
    this.previousElementSibling.appendChild(newPlayerElement);

    // trigger eventListener
    removePlayerButtonEventListener();

    // TODO remove console log
    console.log(tennisFacility);
}

function removePlayerFromTimeSlot() {
    // find the correct player object at the correct position in object and delete it
    const parent = this.parentNode;
    const currentPlayersId = parent.getAttribute('data-player');
    const slotData = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data-time-slot'));
    const courtData = parseInt(this.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-court'));

    const currentCourt = tennisFacility.find(Court => Court.courtNumber === courtData);
    const currentTimeSlot = currentCourt.timeSlots['timeSlot-' + slotData];

    // delete the player
    delete currentTimeSlot.players[currentPlayersId];

    // delete html player element
    parent.parentNode.removeChild(this.parentNode);

    // TODO remove console log
    console.log(tennisFacility);
}

function addPlayerButtonEventListener() {
    let addPlayerButtons = document.querySelectorAll('.add-player');

    for (let i = 0; i < addPlayerButtons.length; i++) {
        addPlayerButtons[i].addEventListener('click', addPlayerToTimeSlot);
    }
}

function removePlayerButtonEventListener() {
    let removePlayerButtons = document.querySelectorAll('.remove-player');

    for (let i = 0; i < removePlayerButtons.length; i++) {
        removePlayerButtons[i].addEventListener('click', removePlayerFromTimeSlot);
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
}

function addDays(date, days) {
    let getNewDate = new Date(date);
    const newDate = getNewDate.setDate(getNewDate.getDate() + days);
    germanDateOutput(newDate);
}

document.addEventListener("DOMContentLoaded", howManyCourts);