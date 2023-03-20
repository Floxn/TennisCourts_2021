// TODO Mentoring: removePlayerButtonEventListener() will nicht so richtig funktionieren
//  -> falsche stelle vom eventListener?

class Player {
    #firstname = "";
    #surname = "";
    #fullname = "";

    set firstname(firstname) {
        if (this.#firstname.length === 0) {
            this.#firstname = firstname;
        }
    }

    set surname(surname) {
        if (this.#surname.length === 0) {
            this.#surname = surname;
        }
    }

    get surname() {
        if (this.#surname.length > 0) {
            return this.#surname
        }
    }

    #removePlayerButtonEventListener() {
        const removePlayerButtons = document.querySelectorAll('.remove-player');
        for (let i = 0; i < removePlayerButtons.length; i++) {
            removePlayerButtons[i].addEventListener('click', (event) => {
                this.#removePlayerFromTimeSlot(event);
            });
        }
    }

    #removePlayerFromTimeSlot(event) {
        const parent = event.target.parentNode;

        parent.parentNode.removeChild(parent);
    }

    #buildPlayerHTML() {
        // build new players element and append it
        const newPlayerElement = createNewElement(
            'div',
            ['player', 'bg-success', 'bg-opacity-50'],
            `${this.#firstname} ${this.#surname}`
        )

        const removeButton = createNewElement(
            'button',
            ['remove-player', 'btn', 'btn-danger'],
            'x'
        )

        newPlayerElement.appendChild(removeButton);

        // this.#removePlayerButtonEventListener();
        return newPlayerElement;
    }

    render() {
        return this.#buildPlayerHTML()
    }
}

/*
const player = new Player();
player.firstname = "Franz";
player.surname = "Müller";
player.render();*/
//console.log(player.render().querySelector("button").textContent);


/*

function player (playerName) {
    this.name = playerName
}

player.prototype = {
    setName: function () {

    }
}

new player("Frank")
*/
