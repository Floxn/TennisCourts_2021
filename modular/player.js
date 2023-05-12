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

    #buildPlayerHTML(slotEl) {
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

        return newPlayerElement;
    }

    render(slotEl) {
        return this.#buildPlayerHTML(slotEl)
    }
}