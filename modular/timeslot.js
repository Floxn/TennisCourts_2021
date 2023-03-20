// TODO Löschen der einzelnen Spieler muss noch implementiert werden
// TODO maximale Anzahl an Player setzen
// TODO beim löschen muss einmal komplett rerendered werden

const setAttributes = (element, attributes) => {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

class Timeslot {
    #begin = "";
    #end = "";

    #playerCollection = [];

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

    set setPlayerToCollection (player) {
        if (this.#playerCollection.length <= 3) {
            this.#playerCollection.push(player);
        }
    }

    get getPlayerCollection () {
        if (this.#playerCollection.length > 0) {
            return this.#playerCollection
        }
    }


    #init() {
        this.#modalSetFocusToFirstnameOnOpen();
    }

    #closeModal () {
        // TODO Mentoring: Hier hab ich kein Bootstrap zur Verfügungen, i think
        //  const newModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        document.querySelector('[data-player-firstname]').value = '';
        document.querySelector('[data-player-lastname]').value = '';
        // newModal.hide();
        document.querySelector('.btn-close').click();
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
        this.setPlayerToCollection = player;

        player.firstname = playerFirstname;
        player.surname = playerLastname;

        const renderedPlayer = player.render();

        this.#closeModal();
        console.log(this.#playerCollection)
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

            // this.#closeModal(); muss noch irgendwo rein
        })

/*
        // TODO das hier sollte eigentlich die Slots in den Court packen. Aber wegen der Reihenfolge der Scripts weis natürlich timeslot.js nicht von court.js

        const courtSlots = document.querySelector('.court-slots');
        courtSlots.appendChild(theSlot);
*/

        theSlot.appendChild(slotTime);
        theSlot.appendChild(slotPlayer);
        theSlot.appendChild(addPlayerButton);

        return theSlot
    }

    render (timeSlot) {
        // timeSlot.innerHTML = "";
        this.#init();
        return this.#buildSlotHTML(timeSlot)
    }
}
