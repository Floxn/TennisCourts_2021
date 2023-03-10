// TODO hier kommt noch das modal für den addToPlayer mit rein

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

    #buildSlotHTML () {
        const theSlot = document.createElement('div');
        theSlot.classList.add('asdf');

        const newSlot = document.createElement('div');
        newSlot.classList.add('time-slot');

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
        addPlayerButton.textContent = 'add new Player';

        addPlayerButton.addEventListener("click", () => {
            // TODO öffne hier das Modal, erstmal fest hier rein und nicht als extra Klasse
         console.log("HI" + this.#player[0].surname)
        })

        theSlot.appendChild(newSlot);
        newSlot.appendChild(slotTime);
        newSlot.appendChild(slotPlayer);
        newSlot.appendChild(addPlayerButton);

        return theSlot
    }

    render () {
        return this.#buildSlotHTML()
    }
}

const player1 = new Player()
player1.firstname = "Franz";
player1.surname = "Müller";

const timeslot = new Timeslot();
timeslot.begin = '7';
timeslot.end = `8`;
timeslot.player = player1;
console.log(timeslot.player)

document.body.appendChild(timeslot.render())
