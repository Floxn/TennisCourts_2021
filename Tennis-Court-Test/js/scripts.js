let tennisFacility = [];
var players = {};

// Tennis facility has more than one tennis court
// tennis facility {
//  tennis court
//  tennis court
//  tennis court
// }

// add a new Court to the tennis facility
function addNewCourt() {
    addNewPlayers();
    addPlayersToCourt();

    console.log(tennisFacility);
}

// remove last court from tennis facility
function removeLastCourt() {
    const courtCounter = tennisFacility.length
    if (courtCounter > 0) {
        document.getElementById('court-' + courtCounter).remove();
        console.log("Court no. " + courtCounter + " is deleted");
        tennisFacility.pop();
        console.log(tennisFacility);
    } else {
        console.log("There is no Court to delete");
    }
}


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
}

// add players to players array
function addNewPlayers() {
    let numberOfPlayer = howManyPlayers();

    // iterate through the Number who is set via prompt
    for (var i = 0; i < numberOfPlayer; i++) {
        let playerForename = prompt("Please enter Forename");
        let playerLastname = prompt("Please enter Lastname");
        players[i] = new Player(playerForename, playerLastname);
    }
}

function howManyPlayers() {
    // need prompt to get number of player
    // max number of player is 4
    let numberOfPlayer = (function ask() {
        var n = prompt('How many Players would join the game? 1 to 4:');
        return isNaN(n) || +n > 4 || +n < 1 ? ask() : n;
    }());
    return numberOfPlayer;
}

function addPlayersToCourt() {
    // set a new Court
    let newCourt = new Court(tennisFacility.length + 1);

    // write all players as a new Property
    newCourt.players = players;

    // add the new court to the facility
    tennisFacility.push(newCourt);
    console.log("Court no. " + newCourt.courtNumber + " is added");

    buildHtmlAddCourtWithPlayer(newCourt.courtNumber);
    return players = {};
}

function buildHtmlAddCourtWithPlayer(courtCounter) {
    const facility = document.getElementById("tennisFacility");
    const courtNumberClass = 'court-' + courtCounter;
    let playerNumber = 0;

    // add tennis court html to tennis facility block
    facility.innerHTML += '<div class="tennisCourt ' + courtNumberClass + '" id="' + courtNumberClass + '"><h2>Court-No: ' + courtCounter + '</h2></div>';

    const court = document.getElementById(courtNumberClass);

    // add every single player to the court
    Object.entries(players).forEach(([key, player], index) => {
        playerNumber++;

        playerName = player.forename + ' ' + player.lastname;
        newPlayer = '<div class="tennisPlayer player-' + playerNumber + '">' + playerName + '</div>';

        court.innerHTML += newPlayer;

    })

}

document.getElementById("addCourt").addEventListener("click", addNewCourt);
document.getElementById("removeCourt").addEventListener("click", removeLastCourt);