class Player {
    #firstname = "";
    #surname = "";

    set firstname (firstname) {
        if (this.#firstname.length === 0) {
            this.#firstname = firstname;
        }
    }

    set surname (surname) {
        if (this.#surname.length === 0) {
            this.#surname = surname;
        }
    }

    get surname () {
        if (this.#surname.length > 0) {
            return this.#surname
        }
    }

    #buildPlayerHTML () {
        // build new players element and append it
        const newPlayerElement = document.createElement('div');
        newPlayerElement.classList.add('player', 'bg-success', 'bg-opacity-50');
        newPlayerElement.textContent = `${this.#firstname} ${this.#surname}`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-player', 'btn', 'btn-danger');
        removeButton.textContent = 'x';
        newPlayerElement.appendChild(removeButton);

        return newPlayerElement;
    }

    render () {
        return this.#buildPlayerHTML()
    }
}

const player = new Player();
player.firstname = "Franz";
player.surname = "Müller";
player.render()
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
