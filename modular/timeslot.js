// TODO Löschen der einzelnen Spieler muss noch implementiert werden
// TODO maximale Anzahl an Player setzen
// TODO beim löschen muss einmal komplett rerendered werden

class Timeslot {
    #begin = "";
    #end = "";

    #playerSlotElement;

    #playerCollection = [];

    set begin(begin) {
        if (this.#begin.length === 0) {
            this.#begin = begin;
        }
    }

    set end(end) {
        if (this.#end.length === 0) {
            this.#end = end;
        }
    }

    set setPlayerToCollection(player) {
        if (this.#playerCollection.length <= 3) {
            this.#playerCollection.push(player);
        }
    }

    set setPlayerSlotElement(domEl) {
        this.#playerSlotElement = domEl;
    }

    get getPlayerSlotElement() {
        return this.#playerSlotElement;
    }

    get getPlayerCollection() {
        if (this.#playerCollection.length > 0) {
            return this.#playerCollection
        }
    }


    #init() {
        this.#modalSetFocusToFirstnameOnOpen();
    }

    #closeModal() {
        document.querySelector('[data-player-firstname]').value = '';
        document.querySelector('[data-player-lastname]').value = '';
        document.querySelector('.btn-close').click();
    }

    #modalSetFocusToFirstnameOnOpen() {
        // set the focus to the firstname on show.bs.modal event
        const theModal = document.getElementById('modal');
        theModal.addEventListener('show.bs.modal', event => {
            const firstnameInput = theModal.querySelector('[data-player-firstname]');
            // timeout is needed to begin after the fade in of the modal
            setTimeout(() => {
                firstnameInput.focus();
            }, 1)
        })
    }


    // TODO Mentoring: Wie wird der Player hier eingebunden? Benutzt man new Player(), oder schreibt man den Player in die Variable playerCollection und rendert dann den Slot?

    #newPlayer(playerFirstname, playerLastname) {
        const player = new Player()
        player.firstname = playerFirstname;
        player.surname = playerLastname;

        this.setPlayerToCollection = player;

        const renderedPlayer = player.render();

        this.#closeModal(); // TODO Mentoring: Das hier sollte sicherlich asyncron bei addPlayer be on click passieren
        console.log(this.#playerCollection)
        return player.render(this.getPlayerSlotElement);
    }

    #setPlayerName(event, addPlayerButton, slotPlayer) {
        console.log(event, addPlayerButton, slotPlayer)
        if (event.key === 'Enter') {
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
            slotPlayer.appendChild(this.#newPlayer(playerFirstnameInput.value, playerLastnameInput.value))
            //slotPlayer.appendChild(this.#newPlayer("Maria", "Müller"))

            document.body.removeEventListener('keydown')
        }
    }

    #addPlayer(addPlayerButton, slotPlayer) {
        // Modal öffnen
        const theModal = document.getElementById('modal');
        theModal.style.display = "block";
        // theModal.modal('show');
        // Fokus auf erstes Feld Vorname
        const firstnameInput = theModal.querySelector('[data-player-firstname]');
        firstnameInput.focus();

        // Close btn
        const closeBtn = document.querySelector(".btn-close")
        closeBtn.addEventListener("click", () => {
            theModal.style.display = "none";
        })

        //  slotPlayer.appendChild(this.#newPlayer("Maria", "Müller"))
        // TODO Mentoring: kann man die Methode #addPlayer() vereinfachter schreiben?
        /* const confirmPlayerButton = document.querySelector('[data-confirm-player]');
         confirmPlayerButton.addEventListener('click', (event) => {

             const playerFirstname = document.querySelector('[data-player-firstname]');
             const playerLastname = document.querySelector('[data-player-lastname]');

             if (!playerFirstname.value || !playerLastname.value) {
                 if (!playerFirstname.value && !playerLastname.value) {
                     document.querySelector('[data-player-firstname]').focus();
                     return alert('Please enter first and lastname');
                 }
                 if (!playerFirstname.value && playerLastname.value) {
                     document.querySelector('[data-player-firstname]').focus();
                     return alert('Please enter firstname');
                 }
                 if (playerFirstname.value && !playerLastname.value) {
                     document.querySelector('[data-player-lastname]').focus();
                     return alert('Please enter lastname');
                 }
             }

             slotPlayer.appendChild(this.#newPlayer(playerFirstname.value, playerLastname.value))
         });*/

        // Make input submit with the enter key
        const playerFirstnameInput = document.querySelector('[data-player-firstname]');
        const playerLastnameInput = document.querySelector('[data-player-lastname]');


        // TODO MENTROTING: DIESER BLÖDE EVENTLISTENER MUSS IRGENDWO WIEDER GELÖSCHT WERDEN; Irgendwie vervielfachen sich diese
        // Alternative war als Versuch document.body.removeEventListener('keydown', this.#setPlayerName(event, addPlayerButton, slotPlayer))


        document.body.addEventListener('keydown', event => {
            console.log(event)
            if (event.key === 'Enter') {
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

                //const newPlayer = addPlayerButton.previousSibling;
                //slotPlayer.appendChild(this.#newPlayer(playerFirstnameInput.value, playerLastnameInput.value))
                slotPlayer.appendChild(this.#newPlayer("Maria", "Müller"))

                document.body.removeEventListener('keydown')  
            }
        })
    }

    #buildSlotHTML() {
        const theSlot = createNewElement(
            'div',
            ['time-slot']
        )

        // Build Slot Time
        const slotTime = createNewElement(
            'div',
            ['time-slot-time']
        )

        const slotTimeBegin = createNewElement(
            'span',
            ['time-slot-time-begin'],
            this.#begin
        )

        const slotTimeEnd = createNewElement(
            'span',
            ['time-slot-time-end'],
            this.#end
        )

        slotTime.appendChild(slotTimeBegin);
        slotTime.appendChild(slotTimeEnd);

        // Build Player Wrapper
        // TODO so oft rendern wie Player vorhanden sind
        const slotPlayer = createNewElement(
            'div',
            ['time-slot-players']
        )

        //this.setPlayerSlotElement = slotPlayer;

        // Build add Player Button
        const addPlayerButton = createNewElement(
            'button',
            ['add-player', 'btn', 'btn-sm', 'btn-outline-success'],
            'add new Player',
            // {'data-bs-toggle': 'modal', 'data-bs-target': '#staticBackdrop'}
        );

        theSlot.appendChild(slotTime);
        theSlot.appendChild(slotPlayer);
        theSlot.appendChild(addPlayerButton);

        addPlayerButton.addEventListener("click", () => {
            // TODO öffne hier das Modal, erstmal fest hier rein und nicht als extra Klasse
            this.#addPlayer(addPlayerButton, slotPlayer);
        })

        return theSlot
    }

    render(timeSlot) {
        // timeSlot.innerHTML = "";
        this.#init();
        return this.#buildSlotHTML(timeSlot)
    }
}
