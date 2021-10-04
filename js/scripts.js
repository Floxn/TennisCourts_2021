
// TODO next: Make Timetable for each Court to add players on court for each Hour for example 17-18 o´clock order 09-10 o´clock

let tennisFacility = [];
var players = {};

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
    this.players = {};
}

function howManyCourts() {
    let numberOfCourts = (function ask() {
        var number = prompt('How many Courts are on the tennis facility?');
        return isNaN(number) || +number <= 0 ? ask() : number;
    }());
    addNewCourt(numberOfCourts);
}

function addNewCourt(numberOfCourts) {
    console.log('Number of Courts:' + numberOfCourts)
    for (let courtNumber = 1; courtNumber <= numberOfCourts; courtNumber++) {

        buildCourtHTML(courtNumber);

        let newCourt = new Court(tennisFacility.length + 1);
        tennisFacility.push(newCourt);
    }
    addPlayerButtonEventListener();

}

function buildCourtHTML(courtNumber) {
    const courtNumberClass = 'court-' + courtNumber;

    // Build Court Wrapper
    newCourt = document.createElement('div');
    newCourt.classList.add('court', courtNumberClass);
    newCourt.id = courtNumberClass;
    const courtElement = newCourt;

    // Build Court Headline
    courtHeadline = document.createElement('h2');
    courtHeadline.textContent = 'Court-No: ' + courtNumber;

    // Build Player Wrapper
    courtPlayers = document.createElement('div');
    courtPlayers.classList.add('court-players');

    // Build add Player Button
    addPlayerButton = document.createElement('button');
    addPlayerButton.classList.add('add-player', 'add-player-' +courtNumberClass);
    addPlayerButton.textContent = 'add new Player';

    facility.appendChild(courtElement);
    courtElement.appendChild(courtHeadline);
    courtElement.appendChild(courtPlayers);
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

    // get the court id
    let courtId = this.parentElement.id;
    courtId = courtId.replace('court-','');
    courtId = parseInt(courtId);

    // get the name of the player who will be added
    const playerForename = prompt("Please enter Forename");
    const playerLastname = prompt("Please enter Lastname");
    const newPlayer = new Player(playerForename, playerLastname);

    // find the correct Court object
    let currentCourt = tennisFacility.find(Court => Court.courtNumber === courtId);

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

document.addEventListener("DOMContentLoaded", howManyCourts);