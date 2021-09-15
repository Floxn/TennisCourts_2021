let tennisFacility = [];

// Tennis facility has more than one tennis court
// tennis facility {
//  tennis court
//  tennis court
//  tennis court
// }

// Object to build a Player
function Player(forename, lastname) {
    this.forename = forename;
    this.lastname = lastname;
}

// Object to build a Tennis Court
function Court(courtNumber, player1, player2, player3, player4) {
    this.courtNumber = courtNumber;
    this.player1 = player1;
    this.player2 = player2;
    this.player3 = player3;
    this.player4 = player4;
}


function addNewCourt() {
    var newCourt = new Court(tennisFacility.length + 1, "Florian Krohmer", "Zina Krohmer", "Hans Krohmer", "Nochein Krohmer");
    tennisFacility.push(newCourt);
    console.log("Court no. " + newCourt.courtNumber + " is added");
    console.log(newCourt.player1 + newCourt.player2 + newCourt.player3 + newCourt.player4);
    console.log(tennisFacility);
}

function removeLastCourt() {
    if (tennisFacility.length > 0) {
        console.log("Court no. " + tennisFacility.length + " is deleted");
        tennisFacility.pop();
        console.log(tennisFacility);
    } else {
        console.log("There is no Court to delete");
    }
}

let trigger = document.getElementById("header");
trigger.addEventListener("click", machWas);
document.getElementById("addCourt").addEventListener("click", addNewCourt);
document.getElementById("removeCourt").addEventListener("click", removeLastCourt);