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
    if (tennisFacility.length > 0) {
        console.log("Court no. " + tennisFacility.length + " is deleted");
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
    // need input to get number of player
    let numberOfPlayer = (function ask() {
        var n = prompt('How many Players would join the game? 1 to 4:');
        return isNaN(n) || +n > 4 || +n < 1 ? ask() : n;
    }());
    return numberOfPlayer;
}

function addPlayersToCourt() {
    let newCourt = new Court(tennisFacility.length + 1);

    newCourt.players = players;

    tennisFacility.push(newCourt);
    console.log("Court no. " + newCourt.courtNumber + " is added");
    return players = {};
}

document.getElementById("addCourt").addEventListener("click", addNewCourt);
document.getElementById("removeCourt").addEventListener("click", removeLastCourt);