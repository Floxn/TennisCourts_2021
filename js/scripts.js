// TODO next: Check if player id is already exists in court and time slot
// TODO next: Weekly View
// TODO next next :) : Include Database

let tennisFacility = [];
let {globalCourtData, globalSlotData, globalClickedTimeSlot} = '';

var theModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
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
function Court(courtNumber) {
    this.courtNumber = courtNumber;
    this.timeSlots = {};
}

// Check how many Court the Facility have
function howManyCourts() {
    let numberOfCourts = document.querySelector('#howManyCourts').value
    if (numberOfCourts <= 1 || numberOfCourts >= 21) {
        return
    }
    deleteHowManyCourtsInput();
    addNewCourt(numberOfCourts);
}

function deleteHowManyCourtsInput() {
    document.body.removeChild(document.querySelector('#initialCourtSetup'));
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
            let endTime = (begin + 1) + ':00 Uhr';
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

function buildSlotHTML(courtNumber, slotNumber, beginTime, endTime) {
    const container = document.querySelector('[data-court="' + courtNumber + '"]')
    const theSlot = container.querySelector('.court-slots');

    const slotNumberClass = 'time-slot-' + slotNumber;

    newSlot = document.createElement('div');
    newSlot.classList.add('time-slot', slotNumberClass);
    newSlot.setAttribute('data-time-slot', slotNumber);

    // Build Slot Time
    slotTime = document.createElement('div');
    slotTime.classList.add('time-slot-time');

    slotTimeBegin = document.createElement('span');
    slotTimeBegin.classList.add('time-slot-time-begin');
    slotTimeBegin.textContent = beginTime;
    slotTime.appendChild(slotTimeBegin);

    slotTimeEnd = document.createElement('span');
    slotTimeEnd.classList.add('time-slot-time-end');
    slotTimeEnd.textContent = endTime;
    slotTime.appendChild(slotTimeEnd);

    // Build Player Wrapper
    slotPlayer = document.createElement('div');
    slotPlayer.classList.add('time-slot-players');

    // Build add Player Button
    addPlayerButton = document.createElement('button');
    addPlayerButton.classList.add('add-player', 'btn', 'btn-sm', 'btn-outline-success', 'add-player-' + slotNumberClass);
    setAttributes(addPlayerButton, {'data-bs-toggle': 'modal', 'data-bs-target': '#staticBackdrop'})
    addPlayerButton.textContent = 'add new Player';

    theSlot.appendChild(newSlot);
    newSlot.appendChild(slotTime);
    newSlot.appendChild(slotPlayer);
    newSlot.appendChild(addPlayerButton);
}

// Helper functions
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
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

function buildPlayerHTML(playerFirstname, playerLastname, playerNumber) {
    // build new players element and append it
    newPlayerElement = document.createElement('div');
    newPlayerElement.classList.add('player', 'bg-success', 'bg-opacity-50');
    newPlayerElement.setAttribute('data-player', playerNumber);
    newPlayerElement.textContent = playerFirstname + ' ' + playerLastname;

    removeButton = document.createElement('button');
    removeButton.classList.add('remove-player', 'btn', 'btn-danger');
    removeButton.textContent = 'x';
    newPlayerElement.appendChild(removeButton);
}

function getGlobalData() {
    // write data to global variables
    globalClickedTimeSlot = this;
    globalSlotData = parseInt(this.parentElement.getAttribute('data-time-slot'));
    globalCourtData = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data-court'));
}

function addPlayerToSlot() {

    // get first and lastname input value
    let playerFirstname = document.querySelector('[data-player-firstname]').value;
    let playerLastname = document.querySelector('[data-player-lastname]').value;

    // return if one of the inputs is not filled
    if (!playerFirstname || !playerLastname) {
        return alert('Please enter first and lastname');
    }
    // write new Player Object
    const newPlayer = new Player(playerFirstname, playerLastname);

    // find the correct Court object
    const currentCourt = tennisFacility.find(Court => Court.courtNumber === globalCourtData);
    const currentTimeSlot = currentCourt.timeSlots['timeSlot-' + globalSlotData];

    // get length of Players Object in the current court
    const courtPlayerLength = Object.keys(currentTimeSlot.players).length + 1;

    playerNumber = 'player-' + courtPlayerLength;

    // add new Player to the current timeSlot
    currentTimeSlot.players[playerNumber] = newPlayer;

    // add Player to HTML
    buildPlayerHTML(playerFirstname, playerLastname, playerNumber);
    globalClickedTimeSlot.previousElementSibling.appendChild(newPlayerElement);

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

function closeModal() {
    document.querySelector('[data-player-firstname]').value = '';
    document.querySelector('[data-player-lastname]').value = '';
    theModal.hide();
}

function addPlayerButtonEventListener() {
    let addPlayerButtons = document.querySelectorAll('.add-player');

    for (let i = 0; i < addPlayerButtons.length; i++) {
        addPlayerButtons[i].addEventListener('click', getGlobalData);
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
    const month = (thisDate.getMonth() + 1);
    const year = thisDate.getFullYear();
}

function addDays(date, days) {
    let getNewDate = new Date(date);
    const newDate = getNewDate.setDate(getNewDate.getDate() + days);
    germanDateOutput(newDate);
}

// Handle initial Court setup
document.querySelector('#initialCourtSetup .btn').addEventListener('click', howManyCourts);

const courtNumberInput = document.querySelector('#howManyCourts');
document.body.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        if (event.target !== courtNumberInput) {
            return
        }
        howManyCourts();
    }
});

// Handle the Modal input
const addPlayerButtons = document.querySelector('[data-confirm-player]');
addPlayerButtons.addEventListener('click', addPlayerToSlot);

// Make input submit with the enter key
const playerFirstnameInput = document.querySelector('[data-player-firstname]');
const playerLastnameInput = document.querySelector('[data-player-lastname]');

document.body.addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        // TODO implement set focus to empty input on press enter before submit
        if (event.target !== playerFirstnameInput && event.target !== playerLastnameInput) {
            return
        }
        addPlayerToSlot();
    }
})