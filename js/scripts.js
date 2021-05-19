
// Object to build a Player
function Player(forename,lastname){
    this.forename = forename;
    this.lastname = lastname;
}

function machWas() {
    var player1 = new Player("Florian", "Krohmer");
    var player2 = new Player("Zina","Krohmer");

    console.log(player1.forename + ' ' + player1.lastname);
    console.log(player2.forename + ' ' + player2.lastname);

    var newPlayerForename = window.prompt("Wie ist dein Vorname", "Vorname");
    var newPlayerLastname = window.prompt("Wie ist der Nachname", "Nachname");

    var player3 = new Player(newPlayerForename, newPlayerLastname);
    console.log(player3.forename + ' ' + player3.lastname);
}

let trigger = document.getElementById("header");
trigger.addEventListener("click", machWas);