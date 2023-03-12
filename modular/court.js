class Court {

    #courtNumber = 0;
    #timeslot = [];
    
    set courtNumber (courtNumber) {
        if (this.#courtNumber >= 0) {
            this.#courtNumber = courtNumber
        }
    }

    set timeslot (timeslot) {
        if (this.#timeslot.length >= 0) {
            this.#timeslot.push(timeslot);
        }
    }

    get timeslot () {
        if (this.#timeslot.length >= 0) {
            return this.#timeslot
        }
    }

    get courtNumber () {
        if (this.#courtNumber.length >= 0) {
            return this.#courtNumber
        }
    }


    #buildCourtHTML () {

        const courtNumberClass = `court-${this.#courtNumber}`;

        // Build Court Wrapper
        const newCourt = document.createElement('div');
        newCourt.classList.add('court', courtNumberClass);
        newCourt.id = courtNumberClass;

        // Build Court Headline
        const courtHeadline = document.createElement('h2');
        courtHeadline.textContent = `Court-No: ${this.#courtNumber}`;

        // Build Timeslots Wrapper
        const courtTimeSlots = document.createElement('div');
        courtTimeSlots.classList.add('court-slots');

        newCourt.appendChild(courtHeadline);
        newCourt.appendChild(courtTimeSlots);

        return newCourt;
    }
    
    render () {
        return this.#buildCourtHTML();
    }
}

const player1 = new Player()
player1.firstname = "Franz";
player1.surname = "Müller";

const timeslot1 = new Timeslot();
timeslot1.begin = '7:00 Uhr';
timeslot1.end = `8:00 Uhr`;
timeslot1.player = player1;
console.log(timeslot1.player)

document.body.appendChild(timeslot1.render())


for (let i = 0; i < 5; i++) {
    const court = new Court();
    court.courtNumber = i;
    court.timeslot = timeslot1;

    console.log(court.timeslot)
    document.body.appendChild(court.render())
}
