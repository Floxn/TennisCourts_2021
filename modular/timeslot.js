// TODO WICHTIG modal() heißt nun addPlayer()
// TODO Löschen der einzelnen Spieler muss noch implementiert werden
// TODO maximale Anzahl an Player setzen


// TODO Mentoring: Warum konnte ich diese Funktion nicht in die Klasse rein schreiben?
const setAttributes = (element, attributes) => {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

class Timeslot {
    #begin = "";
    #end = "";

    #player = [];

    set begin (begin) {
        if(this.#begin.length === 0) {
            this.#begin = begin;
        }
    }

    set end (end) {
        if(this.#end.length === 0) {
            this.#end = end;
        }
    }

    set player (player) {
        if (this.#player.length <= 3) {
            this.#player.push(player);
        }
    }

    get player () {
        if (this.#player.length > 0) {
            return this.#player
        }
    }

    #init() {
        this.#modalSetFocusToFirstnameOnOpen();
    }

    #closeModal () {
        // TODO Mentoring: Hier hab ich kein Bootstrap zur Verfügungen, i think
        // const newModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        document.querySelector('[data-player-firstname]').value = '';
        document.querySelector('[data-player-lastname]').value = '';
        // newModal.hide();
    }

    #modalSetFocusToFirstnameOnOpen () {
        // set the focus to the firstname on show.bs.modal event
        const theModal = document.getElementById('staticBackdrop');
        theModal.addEventListener('show.bs.modal', event => {
            const firstnameInput = theModal.querySelector('[data-player-firstname]');
            // timeout is needed to begin after the fade in of the modal
            setTimeout(() => {
                firstnameInput.focus();
            }, 1)
        })
    }

    #newPlayer(playerFirstname, playerLastname) {
        const player = new Player()
        player.firstname = playerFirstname;
        player.surname = playerLastname;

        this.#closeModal();
        return player.render();
    }

    #addPlayer (addPlayerButton) {

        // TODO Mentoring: kann man die Methode #addPlayer() vereinfachter schreiben?
        const confirmPlayerButton = document.querySelector('[data-confirm-player]');
        confirmPlayerButton.addEventListener('click', () => {

            const playerFirstname = document.querySelector('[data-player-firstname]').value;
            const playerLastname = document.querySelector('[data-player-lastname]').value;

            if (!playerFirstname || !playerLastname) {
                if (!playerFirstname && !playerLastname) {
                    document.querySelector('[data-player-firstname]').focus();
                    return alert('Please enter first and lastname');
                }
                if (!playerFirstname && playerLastname) {
                    document.querySelector('[data-player-firstname]').focus();
                    return alert('Please enter firstname');
                }
                if (playerFirstname && !playerLastname) {
                    document.querySelector('[data-player-lastname]').focus();
                    return alert('Please enter lastname');
                }
            }

            const newPlayer = addPlayerButton.previousSibling;
            return newPlayer.appendChild(this.#newPlayer(playerFirstnameInput.value, playerLastnameInput.value))
        });

        // Make input submit with the enter key
        const playerFirstnameInput = document.querySelector('[data-player-firstname]');
        const playerLastnameInput = document.querySelector('[data-player-lastname]');

        document.body.addEventListener('keypress', event => {
            if(event.key === 'Enter') {
                if (event.target !== playerFirstnameInput && event.target !== playerLastnameInput) {
                    return
                }
                if (event.target === playerLastnameInput && playerFirstnameInput.value === '') {
                    playerFirstnameInput.focus();
                    return
                }
                if (event.target === playerFirstnameInput && playerLastnameInput.value === '') {
                    playerLastnameInput.focus();
                    return
                }

                const newPlayer = addPlayerButton.previousSibling;
                return newPlayer.appendChild(this.#newPlayer(playerFirstnameInput.value, playerLastnameInput.value))
            }
        })
    }

    #buildSlotHTML () {
        const allSlots = document.createElement('div');
        allSlots.classList.add('time-slots');

        const theSlot = document.createElement('div');
        theSlot.classList.add('time-slot');

        // Build Slot Time
        const slotTime = document.createElement('div');
        slotTime.classList.add('time-slot-time');

        const slotTimeBegin = document.createElement('span');
        slotTimeBegin.classList.add('time-slot-time-begin');
        slotTimeBegin.textContent = this.#begin;
        slotTime.appendChild(slotTimeBegin);

        const slotTimeEnd = document.createElement('span');
        slotTimeEnd.classList.add('time-slot-time-end');
        slotTimeEnd.textContent = this.#end;
        slotTime.appendChild(slotTimeEnd);

        // Build Player Wrapper
        // TODO so oft rendern wie Player vorhanden sind
        const slotPlayer = document.createElement('div');
        slotPlayer.classList.add('time-slot-players');

        // Build add Player Button
        const addPlayerButton = document.createElement('button');
        addPlayerButton.classList.add('add-player', 'btn', 'btn-sm', 'btn-outline-success');
        setAttributes(addPlayerButton, {'data-bs-toggle': 'modal', 'data-bs-target': '#staticBackdrop'});
        addPlayerButton.textContent = 'add new Player';

        addPlayerButton.addEventListener("click", () => {
            // TODO öffne hier das Modal, erstmal fest hier rein und nicht als extra Klasse
            this.#addPlayer(addPlayerButton);
            console.log("HI" + this.#player[0].surname)
            this.#modalSetFocusToFirstnameOnOpen();

            // this.#closeModal(); muss noch irgendwo rein
        })

        allSlots.appendChild(theSlot);
        theSlot.appendChild(slotTime);
        theSlot.appendChild(slotPlayer);
        theSlot.appendChild(addPlayerButton);

        return allSlots
    }

    render () {
        this.#init();
        return this.#buildSlotHTML()
    }
}
